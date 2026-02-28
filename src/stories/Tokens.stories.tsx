import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { tokens, type FontToken, type ShadowToken } from '../../tokens';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  };
}

function preferredTextColor(bgHex: string) {
  const { r, g, b } = hexToRgb(bgHex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#FFFFFF';
}

/* ------------------------------------------------------------------ */
/*  Typography helper                                                  */
/* ------------------------------------------------------------------ */

function fontStyle(token: FontToken): React.CSSProperties {
  return {
    fontFamily: token.fontFamily,
    fontWeight: token.fontWeight,
    fontSize: token.fontSize,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
  };
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 style={fontStyle(tokens.typography.heading.desktop.h5)}>{title}</h2>
        {description && <p className="mt-1 text-black/50" style={fontStyle(tokens.typography.paragraph.small)}>{description}</p>}
      </div>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Colors                                                             */
/* ------------------------------------------------------------------ */

function ColorScale({ name, scale }: { name: string; scale: Record<string | number, string> }) {
  const entries = Object.entries(scale);

  return (
    <div className="space-y-3">
      <h3 className="capitalize text-black/70" style={fontStyle(tokens.typography.paragraph.medium)}>{name}</h3>

      {/* Continuous gradient strip */}
      <div className="flex overflow-hidden rounded-xl">
        {entries.map(([step, hex]) => {
          const fg = preferredTextColor(hex);
          return (
            <div
              key={step}
              className="group relative flex-1 cursor-default transition-all hover:flex-[2]"
              style={{ backgroundColor: hex, height: 72 }}
              title={`${name}-${step}: ${hex}`}
            >
              <div
                className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity group-hover:opacity-100"
                style={{ color: fg }}
              >
                <span style={fontStyle(tokens.typography.paragraph.extraSmall)}>{step}</span>
                <span className="opacity-80" style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace' }}>{hex}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail chips */}
      <div className="flex flex-wrap gap-1.5">
        {entries.map(([step, hex]) => (
          <div
            key={step}
            className="flex items-center gap-1.5 rounded-full border border-black/8 bg-white px-2.5 py-1"
          >
            <div className="h-3 w-3 rounded-full border border-black/10" style={{ backgroundColor: hex }} />
            <span className="text-black/60" style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace' }}>{step}</span>
            <span className="text-black/40" style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace' }}>{hex}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ColorSection() {
  const scaleNames = ['orange', 'red', 'yellow', 'green', 'grey', 'blue'] as const;
  return (
    <div className="space-y-8">
      {scaleNames.map((name) => (
        <ColorScale key={name} name={name} scale={tokens.color[name]} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Typography                                                         */
/* ------------------------------------------------------------------ */

function TypographyRow({ name, token }: { name: string; token: FontToken }) {
  return (
    <div className="grid grid-cols-[220px_1fr] items-baseline gap-6 border-b border-black/5 py-4 last:border-0">
      <div className="space-y-1">
        <div className="text-black/80" style={fontStyle(tokens.typography.paragraph.small)}>{name}</div>
        <div className="text-black/40" style={{ ...fontStyle(tokens.typography.paragraph.caption), fontFamily: 'monospace' }}>
          {token.fontSize}px · {token.fontWeight} · {token.letterSpacing}px tracking
        </div>
      </div>
      <div className="min-w-0 truncate" style={fontStyle(token)}>
        The quick brown fox
      </div>
    </div>
  );
}

function TypographySection() {
  // Flatten heading desktop/mobile into rows
  const groups: Array<[string, Record<string, FontToken>]> = [
    ['heading (desktop)', tokens.typography.heading.desktop],
    ['heading (mobile)', tokens.typography.heading.mobile],
    ['paragraph', tokens.typography.paragraph],
    ['button', tokens.typography.button],
    ['form', tokens.typography.form],
  ];

  return (
    <div className="space-y-6">
      {groups.map(([groupName, group]) => (
        <div key={groupName}>
          <h3 className="mb-2 capitalize text-black/70" style={fontStyle(tokens.typography.paragraph.medium)}>{groupName}</h3>
          <div className="rounded-xl border border-black/8 bg-white px-5">
            {Object.entries(group).map(([key, token]) => (
              <TypographyRow key={key} name={`${groupName.split(' ')[0]}.${key}`} token={token} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Spacing                                                            */
/* ------------------------------------------------------------------ */

function SpacingSection() {
  const entries = Object.entries(tokens.space)
    .map(([k, v]) => ({ key: k, value: v }))
    .sort((a, b) => a.value - b.value);

  const max = Math.max(...entries.map((e) => e.value));

  return (
    <div className="rounded-xl border border-black/8 bg-white">
      {entries.map(({ key, value }, i) => (
        <div
          key={key}
          className="grid grid-cols-[60px_60px_1fr] items-center gap-4 px-5 py-2.5"
          style={{ borderTop: i > 0 ? '1px solid rgba(0,0,0,0.04)' : undefined }}
        >
          <span className="text-black/70" style={{ ...fontStyle(tokens.typography.paragraph.small), fontFamily: 'monospace' }}>{key}</span>
          <span className="text-black/40" style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace' }}>{value}px</span>
          <div className="flex items-center">
            <div
              className="h-4 rounded-r-full"
              style={{
                width: `${(value / max) * 100}%`,
                minWidth: 4,
                background: `linear-gradient(90deg, ${tokens.color.blue[400]}, ${tokens.color.blue[600]})`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shadow                                                             */
/* ------------------------------------------------------------------ */

function shadowToCss(shadow: ShadowToken) {
  if (shadow.type !== 'dropShadow') return undefined;
  return `${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blurRadius}px ${shadow.spread}px ${shadow.color}`;
}

function ShadowSection() {
  const shallow = tokens.shadow.shallowBelow;
  const css = shadowToCss(shallow);
  return (
    <div className="inline-flex flex-col items-start gap-4">
      <div
        className="flex h-32 w-64 items-center justify-center rounded-2xl bg-white"
        style={{ boxShadow: css }}
      >
        <span className="text-black/40" style={{ ...fontStyle(tokens.typography.paragraph.small), fontFamily: 'monospace' }}>shallowBelow</span>
      </div>
      <code className="rounded-lg bg-black/4 px-3 py-1.5 text-black/50" style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace' }}>{css}</code>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function TokensPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] p-8 text-black">
      <div className="mx-auto max-w-5xl space-y-12">
        <header>
          <h1 style={fontStyle(tokens.typography.heading.desktop.h4)}>MahalaDS</h1>
          <p className="mt-1 text-black/50" style={fontStyle(tokens.typography.paragraph.medium)}>Design tokens generated from Figma</p>
        </header>

        <Section title="Colors" description="6 palettes, 10 steps each (50 - 900).">
          <ColorSection />
        </Section>

        <Section title="Typography" description="Inter font family across heading, paragraph, button, and form scales.">
          <TypographySection />
        </Section>

        <Section title="Spacing" description="4px base unit, 15 steps from 4 to 128.">
          <SpacingSection />
        </Section>

        <Section title="Shadow" description="Elevation tokens for depth.">
          <ShadowSection />
        </Section>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Story                                                              */
/* ------------------------------------------------------------------ */

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
