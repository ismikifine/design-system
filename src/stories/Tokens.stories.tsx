import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { tokens, type FontToken, type ShadowToken } from '../../tokens';

type StorySectionProps = {
  title: string;
  children: React.ReactNode;
};

function StorySection({ title, children }: StorySectionProps) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

function isHexColor(value: unknown): value is string {
  return typeof value === 'string' && /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value);
}

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const r = Number.parseInt(h.slice(0, 2), 16);
  const g = Number.parseInt(h.slice(2, 4), 16);
  const b = Number.parseInt(h.slice(4, 6), 16);
  return { r, g, b };
}

function preferredTextColor(bgHex: string) {
  const { r, g, b } = hexToRgb(bgHex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6 ? '#000000' : '#FFFFFF';
}

function Swatch({ name, value }: { name: string; value: string }) {
  const fg = preferredTextColor(value);
  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-black/10 p-3">
      <div className="min-w-0">
        <div className="truncate font-mono text-xs text-black/60">{name}</div>
        <div className="font-mono text-xs">{value.toUpperCase()}</div>
      </div>
      <div
        className="h-10 w-20 shrink-0 rounded-md border border-black/10"
        style={{ backgroundColor: value }}
        aria-label={`${name} ${value}`}
        title={`${name} ${value}`}
      />
      <div
        className="h-10 w-10 shrink-0 rounded-md border border-black/10"
        style={{ backgroundColor: value, color: fg }}
        aria-hidden="true"
      >
        <div className="grid h-full w-full place-items-center text-[10px] font-semibold">Aa</div>
      </div>
    </div>
  );
}

function ColorScaleRow({ name, scale }: { name: string; scale: Record<string | number, string> }) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium capitalize">{name}</h3>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
        {Object.entries(scale).map(([k, v]) => (
          <Swatch key={`${name}.${k}`} name={`${name}.${k}`} value={v} />
        ))}
      </div>
    </div>
  );
}

function ColorSection() {
  const semanticEntries: Array<[string, string]> = [];

  for (const [groupKey, groupVal] of Object.entries(tokens.color)) {
    if (groupVal && typeof groupVal === 'object') {
      const hasOnlyHex = Object.values(groupVal).every(isHexColor);
      if (!hasOnlyHex) {
        for (const [k, v] of Object.entries(groupVal)) {
          if (isHexColor(v)) semanticEntries.push([`${groupKey}.${k}`, v]);
        }
      }
    }
  }

  const scaleNames = ['brand', 'error', 'warning', 'success', 'neutral'] as const;

  return (
    <div className="space-y-6">
      {semanticEntries.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Semantic</h3>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
            {semanticEntries.map(([name, value]) => (
              <Swatch key={name} name={name} value={value} />
            ))}
          </div>
        </div>
      )}

      {scaleNames.map((scaleName) => (
        <ColorScaleRow
          key={scaleName}
          name={scaleName}
          scale={tokens.color[scaleName]}
        />
      ))}
    </div>
  );
}

function fontStyleFromToken(token: FontToken): React.CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontWeight: token.fontWeight,
    fontSize: token.fontSize,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
    fontStyle: 'normal',
  };
}

function TypographySection() {
  const blocks: Array<{ name: string; token: FontToken }> = [];

  const addGroup = (prefix: string, group: Record<string, FontToken>) => {
    for (const [k, v] of Object.entries(group)) blocks.push({ name: `${prefix}.${k}`, token: v });
  };

  addGroup('display', tokens.typography.display);
  addGroup('heading', tokens.typography.heading);
  addGroup('label', tokens.typography.label);
  addGroup('paragraph', tokens.typography.paragraph);

  return (
    <div className="space-y-3">
      <div className="text-sm text-black/60">
        Rendering sample text using each token's font family/size/weight/line-height/letter-spacing.
      </div>

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
        {blocks.map(({ name, token }) => (
          <div key={name} className="rounded-md border border-black/10 p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <div className="font-mono text-xs text-black/60">{name}</div>
              <div className="font-mono text-xs text-black/60">
                {token.fontFamily} · {token.fontSize}px/{token.lineHeight}px · {token.fontWeight}
              </div>
            </div>
            <div className="mt-2" style={fontStyleFromToken(token)}>
              The quick brown fox jumps over the lazy dog.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpacingSection() {
  const entries = Object.entries(tokens.space)
    .map(([k, v]) => ({ key: k, value: v }))
    .sort((a, b) => a.value - b.value);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        {entries.map(({ key, value }) => (
          <div key={key} className="flex items-center gap-4 rounded-md border border-black/10 p-3">
            <div className="w-24 font-mono text-xs text-black/70">{key}px</div>
            <div className="flex-1">
              <div className="h-3 rounded bg-black/5">
                <div
                  className="h-3 rounded bg-black/20"
                  style={{ width: `${Math.max(6, Math.min(320, value * 2))}px` }}
                  aria-hidden="true"
                />
              </div>
            </div>
            <div className="w-16 text-right font-mono text-xs text-black/70">{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function shadowToCss(shadow: ShadowToken) {
  if (shadow.type !== 'dropShadow') return undefined;
  return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spread}px ${shadow.color}`;
}

function ShadowSection() {
  const shallow = tokens.shadow.shallowBelow;
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      <div className="rounded-md border border-black/10 p-4">
        <div className="font-mono text-xs text-black/60">shadow.shallowBelow</div>
        <div className="mt-3 h-24 rounded-md bg-white" style={{ boxShadow: shadowToCss(shallow) }} />
        <div className="mt-3 font-mono text-xs text-black/60">{shadowToCss(shallow)}</div>
      </div>
    </div>
  );
}

function TokensPage() {
  return (
    <div className="bg-white p-6 text-black">
      <div className="mx-auto max-w-6xl space-y-10">
        <header className="space-y-1">
          <h1 className="text-2xl font-semibold">Design Tokens</h1>
          <div className="text-sm text-black/60">Generated from Figma variables (Halala Tech) and rendered from `tokens.ts`.</div>
        </header>

        <StorySection title="Colors">
          <ColorSection />
        </StorySection>

        <StorySection title="Typography">
          <TypographySection />
        </StorySection>

        <StorySection title="Spacing">
          <SpacingSection />
        </StorySection>

        <StorySection title="Shadow">
          <ShadowSection />
        </StorySection>
      </div>
    </div>
  );
}

const meta = {
  title: 'Design Tokens/All',
  component: TokensPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TokensPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
