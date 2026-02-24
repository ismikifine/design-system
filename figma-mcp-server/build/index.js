#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema, } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_API_BASE = "https://api.figma.com/v1";
const figmaClient = axios.create({
    baseURL: FIGMA_API_BASE,
    headers: {
        "X-Figma-Token": FIGMA_TOKEN,
    },
});
const server = new Server({
    name: "figma-mcp-server",
    version: "1.0.0",
}, {
    capabilities: {
        tools: {},
    },
});
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "get_figma_file",
                description: "Get the contents of a Figma file",
                inputSchema: {
                    type: "object",
                    properties: {
                        fileKey: {
                            type: "string",
                            description: "The Figma file key from the URL",
                        },
                    },
                    required: ["fileKey"],
                },
            },
            {
                name: "get_figma_component",
                description: "Get a specific component from a Figma file",
                inputSchema: {
                    type: "object",
                    properties: {
                        fileKey: {
                            type: "string",
                            description: "The Figma file key",
                        },
                        nodeId: {
                            type: "string",
                            description: "The component node ID",
                        },
                    },
                    required: ["fileKey", "nodeId"],
                },
            },
            {
                name: "search_figma_components",
                description: "Search for components in a Figma file by name",
                inputSchema: {
                    type: "object",
                    properties: {
                        fileKey: {
                            type: "string",
                            description: "The Figma file key",
                        },
                        searchTerm: {
                            type: "string",
                            description: "Component name to search for",
                        },
                    },
                    required: ["fileKey", "searchTerm"],
                },
            },
        ],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    if (!args) {
        throw new Error("No arguments provided");
    }
    try {
        if (name === "get_figma_file") {
            const response = await figmaClient.get(`/files/${args.fileKey}`);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(response.data, null, 2),
                    },
                ],
            };
        }
        if (name === "get_figma_component") {
            const response = await figmaClient.get(`/files/${args.fileKey}/nodes?ids=${args.nodeId}`);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(response.data, null, 2),
                    },
                ],
            };
        }
        if (name === "search_figma_components") {
            const fileResponse = await figmaClient.get(`/files/${args.fileKey}`);
            const components = [];
            const searchComponents = (node) => {
                if (node.type === "COMPONENT" && node.name.toLowerCase().includes(String(args.searchTerm).toLowerCase())) {
                    components.push({
                        id: node.id,
                        name: node.name,
                        type: node.type,
                    });
                }
                if (node.children) {
                    node.children.forEach(searchComponents);
                }
            };
            searchComponents(fileResponse.data.document);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(components, null, 2),
                    },
                ],
            };
        }
        throw new Error(`Unknown tool: ${name}`);
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        };
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}
main();
