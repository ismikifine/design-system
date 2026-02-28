import type { Meta, StoryObj } from '@storybook/react-vite';
import React from 'react';

import { tokens, type FontToken } from '../../tokens';

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
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

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return {
    r: Number.parseInt(h.slice(0, 2), 16),
    g: Number.parseInt(h.slice(2, 4), 16),
    b: Number.parseInt(h.slice(4, 6), 16),
  };
}

function preferredTextColor(bgHex: string) {
  const { r, g, b } = hexToRgb(bgHex.slice(0, 7));
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#000000' : '#FFFFFF';
}

/* ------------------------------------------------------------------ */
/*  Layout primitives                                                  */
/* ------------------------------------------------------------------ */

function PageShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: '#FAFAFA', padding: 32, fontFamily: 'Inter, sans-serif', color: '#131313' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <header style={{ marginBottom: 40 }}>
          <h1 style={fontStyle(tokens.typography.heading.desktop.h4)}>{title}</h1>
          <p style={{ ...fontStyle(tokens.typography.paragraph.medium), color: 'rgba(0,0,0,0.5)', marginTop: 4 }}>{description}</p>
        </header>
        {children}
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ ...fontStyle(tokens.typography.heading.desktop.h6), marginBottom: 12 }}>{title}</h2>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Color swatch                                                       */
/* ------------------------------------------------------------------ */

function ColorRow({ name, value }: { name: string; value: string }) {
  const fg = preferredTextColor(value);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: value, border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ ...fontStyle(tokens.typography.paragraph.caption), fontFamily: 'monospace', color: fg, opacity: 0.7 }} />
      </div>
      <span style={fontStyle(tokens.typography.paragraph.small)}>{name}</span>
      <span style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace', color: 'rgba(0,0,0,0.45)' }}>{value}</span>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, border: '1px solid rgba(0,0,0,0.06)', padding: '4px 16px' }}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Number / dimension row                                             */
/* ------------------------------------------------------------------ */

function NumberRow({ name, value, unit, maxBar }: { name: string; value: number; unit?: string; maxBar?: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 60px 1fr', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <span style={fontStyle(tokens.typography.paragraph.small)}>{name}</span>
      <span style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace', color: 'rgba(0,0,0,0.45)' }}>
        {value}{unit || ''}
      </span>
      {maxBar != null && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            height: 16,
            borderRadius: '0 8px 8px 0',
            width: `${Math.max((value / maxBar) * 100, 2)}%`,
            background: `linear-gradient(90deg, ${tokens.color.blue[400]}, ${tokens.color.blue[600]})`,
          }} />
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  String row                                                         */
/* ------------------------------------------------------------------ */

function StringRow({ name, value }: { name: string; value: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <span style={fontStyle(tokens.typography.paragraph.small)}>{name}</span>
      <span style={{ ...fontStyle(tokens.typography.paragraph.small), fontFamily: 'monospace', color: 'rgba(0,0,0,0.55)' }}>{value}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Font composition row                                               */
/* ------------------------------------------------------------------ */

function FontRow({ name, family, weight, size, letterSpacing }: { name: string; family: string; weight: number; size: number; letterSpacing: number }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
      <div>
        <div style={fontStyle(tokens.typography.paragraph.small)}>{name}</div>
        <div style={{ ...fontStyle(tokens.typography.paragraph.caption), fontFamily: 'monospace', color: 'rgba(0,0,0,0.35)', marginTop: 2 }}>
          {size}px · {weight} · {letterSpacing}px tracking
        </div>
      </div>
      <div style={{ fontFamily: family, fontWeight: weight, fontSize: size, lineHeight: '120%', letterSpacing, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        The quick brown fox jumps
      </div>
    </div>
  );
}

/* ================================================================== */
/*  SURFACE COLLECTION                                                 */
/* ================================================================== */

function SurfacePage() {
  const variables: Record<string, Record<string, string>> = {
    'Primary': {
      'default': '#ff5a5f',
      'hover': '#ff7b7f',
      'pressed': '#e85256',
    },
    'Dark': {
      'default': '#131313',
      'hover': '#3e3e3e',
      'pressed': '#2f2f2f',
    },
    'Light': {
      'default': '#fcfcfc',
      'hover': '#ffefef',
      'pressed': '#ffcccd',
    },
    'Error': {
      'default': '#f03339',
      'hover': '#f35c61',
      'pressed': '#da2e34',
    },
    'Disabled': {
      'default': '#d3d3d3',
    },
    'Neutral': {
      'default': '#fcfcfc',
      'page-secondary': '#f1f1f1',
    },
  };

  return (
    <PageShell title="Surface" description="Background color variables for interactive surfaces, semantic states, and neutrals.">
      {Object.entries(variables).map(([group, vars]) => (
        <Group key={group} title={group}>
          <Card>
            {Object.entries(vars).map(([name, value]) => (
              <ColorRow key={name} name={`Surface/${group}/${name}`} value={value} />
            ))}
          </Card>
        </Group>
      ))}
    </PageShell>
  );
}

/* ================================================================== */
/*  TEXT COLLECTION                                                     */
/* ================================================================== */

function TextPage() {
  const actionColors: Record<string, Record<string, string>> = {
    'Primary': {
      'default': '#ff5a5f',
      'hover': '#e85256',
      'pressed': '#b54043',
    },
    'Dark': {
      'default': '#131313',
      'hover': '#3e3e3e',
      'pressed': '#2f2f2f',
    },
    'Light': {
      'default': '#fcfcfc',
      'hover': '#ffefef',
      'pressed': '#ffcccd',
    },
    'Error': {
      'default': '#f03339',
      'hover': '#f35c61',
      'pressed': '#da2e34',
      'on-colour': '#fcfcfc',
    },
    'Disabled': {
      'default': '#676767',
    },
  };

  const defaultColors: Record<string, string> = {
    'heading': '#131313',
    'body': '#202020',
  };

  const fontSizes: Record<string, Record<string, number>> = {
    'heading': { h1: 60, h2: 48, h3: 40, h4: 32, h5: 24, h6: 20 },
    'paragraph': { large: 20, medium: 16, small: 14, 'extra small': 12 },
    'caption': { 'font-size': 10 },
  };

  return (
    <PageShell title="Text" description="Text color variables for actions, defaults, and font size primitives.">
      <Group title="Default">
        <Card>
          {Object.entries(defaultColors).map(([name, value]) => (
            <ColorRow key={name} name={`Text/default/${name}`} value={value} />
          ))}
        </Card>
      </Group>

      {Object.entries(actionColors).map(([group, vars]) => (
        <Group key={group} title={`Action / ${group}`}>
          <Card>
            {Object.entries(vars).map(([name, value]) => (
              <ColorRow key={name} name={`Text/action/${group}/${name}`} value={value} />
            ))}
          </Card>
        </Group>
      ))}

      <Group title="Font Sizes">
        <Card>
          {Object.entries(fontSizes).flatMap(([group, vars]) =>
            Object.entries(vars).map(([name, value]) => (
              <NumberRow key={`${group}-${name}`} name={`Text/${group}/${name}/font-size`} value={value} unit="px" maxBar={60} />
            ))
          )}
        </Card>
      </Group>
    </PageShell>
  );
}

/* ================================================================== */
/*  BORDER COLLECTION                                                  */
/* ================================================================== */

function BorderPage() {
  const colors: Record<string, Record<string, string>> = {
    'Primary': {
      'default': '#ff5a5f',
      'hover': '#e85256',
      'pressed': '#b54043',
    },
    'Actions / Dark': {
      'default': '#131313',
      'hover': '#3e3e3e',
      'pressed': '#2f2f2f',
    },
    'Actions / Light': {
      'default': '#fcfcfc',
      'hover': '#ffefef',
      'pressed': '#ffcccd',
    },
    'Actions / Error': {
      'default': '#f03339',
      'pressed': '#da2e34',
    },
    'Actions / Disabled': {
      'default': '#676767',
    },
  };

  return (
    <PageShell title="Border" description="Border color, width, and radius variables.">
      {Object.entries(colors).map(([group, vars]) => (
        <Group key={group} title={group}>
          <Card>
            {Object.entries(vars).map(([name, value]) => (
              <ColorRow key={name} name={`Border/${group}/${name}`} value={value} />
            ))}
          </Card>
        </Group>
      ))}

      <Group title="Width">
        <Card>
          <NumberRow name="Border/Width/sm" value={1} unit="px" />
        </Card>
      </Group>

      <Group title="Radius">
        <Card>
          <div style={{ display: 'grid', gridTemplateColumns: '200px 60px 1fr', alignItems: 'center', gap: 12, padding: '10px 0' }}>
            <span style={fontStyle(tokens.typography.paragraph.small)}>Border/Radius/sm</span>
            <span style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace', color: 'rgba(0,0,0,0.45)' }}>8px</span>
            <div style={{ width: 48, height: 48, border: '2px solid #131313', borderRadius: 8, background: 'rgba(0,0,0,0.02)' }} />
          </div>
        </Card>
      </Group>
    </PageShell>
  );
}

/* ================================================================== */
/*  ICON COLLECTION                                                    */
/* ================================================================== */

function IconPage() {
  const groups: Record<string, Record<string, string>> = {
    'Primary': {
      'default': '#ff5a5f',
      'hover': '#e85256',
      'pressed': '#b54043',
    },
    'Dark': {
      'default': '#131313',
      'hover': '#3e3e3e',
      'pressed': '#2f2f2f',
    },
    'Light': {
      'default': '#fcfcfc',
      'hover': '#ffefef',
      'pressed': '#ffcccd',
    },
    'Error': {
      'default': '#f03339',
      'hover': '#f35c61',
      'pressed': '#da2e34',
    },
    'Disabled': {
      'default': '#676767',
    },
  };

  return (
    <PageShell title="Icon" description="Icon color variables for action states across all variants.">
      {Object.entries(groups).map(([group, vars]) => (
        <Group key={group} title={`Action / ${group}`}>
          <Card>
            {Object.entries(vars).map(([name, value]) => {
              const fg = preferredTextColor(value);
              return (
                <div key={name} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 120px', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 8, backgroundColor: value, border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.5 7.5H17.5L13.5 11L15 17L10 13.5L5 17L6.5 11L2.5 7.5H7.5L10 2Z" fill={fg} /></svg>
                  </div>
                  <span style={fontStyle(tokens.typography.paragraph.small)}>Icon/action/{group}/{name}</span>
                  <span style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace', color: 'rgba(0,0,0,0.45)' }}>{value}</span>
                </div>
              );
            })}
          </Card>
        </Group>
      ))}
    </PageShell>
  );
}

/* ================================================================== */
/*  SPACING COLLECTION                                                 */
/* ================================================================== */

function SpacingPage() {
  const spacingVars = [
    { name: 'Spacing/8', value: 8 },
    { name: 'Spacing/12', value: 12 },
    { name: 'Spacing/16', value: 16 },
    { name: 'Spacing/48', value: 48 },
    { name: 'Spacing/80', value: 80 },
  ];

  return (
    <PageShell title="Spacing" description="Spacing primitive variables used across components.">
      <Group title="Scale">
        <Card>
          {spacingVars.map(({ name, value }) => (
            <NumberRow key={name} name={name} value={value} unit="px" maxBar={80} />
          ))}
        </Card>
      </Group>

      <Group title="Visual Reference">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {spacingVars.map(({ name, value }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ ...fontStyle(tokens.typography.paragraph.extraSmall), fontFamily: 'monospace', width: 100, textAlign: 'right', color: 'rgba(0,0,0,0.45)' }}>{name.split('/')[1]}px</span>
              <div style={{
                width: value,
                height: value,
                borderRadius: 4,
                background: `linear-gradient(135deg, ${tokens.color.blue[400]}, ${tokens.color.blue[600]})`,
              }} />
            </div>
          ))}
        </div>
      </Group>
    </PageShell>
  );
}

/* ================================================================== */
/*  FONT COLLECTION                                                    */
/* ================================================================== */

function FontPage() {
  return (
    <PageShell title="Font" description="Font family and weight primitive variables.">
      <Group title="Family">
        <Card>
          <StringRow name="Font/Family/Inter" value="Inter" />
        </Card>
      </Group>

      <Group title="Weight">
        <Card>
          <StringRow name="Font/Weight/Bold" value="Bold (700)" />
          <StringRow name="Font/Weight/Semi Bold" value="Semi Bold (600)" />
          <StringRow name="Font/Weight/Regular" value="Regular (400)" />
        </Card>
      </Group>

      <Group title="Static Values">
        <Card>
          <NumberRow name="Static/Display Large/Tracking" value={-0.25} unit="px" />
          <NumberRow name="Static/Display Medium/Tracking" value={0} unit="px" />
        </Card>
      </Group>
    </PageShell>
  );
}

/* ================================================================== */
/*  TYPOGRAPHY COMPOSITIONS                                            */
/* ================================================================== */

function TypographyPage() {
  const desktopHeadings = [
    { name: 'Desktop/heading/h1', size: 60, weight: 700, ls: -0.25 },
    { name: 'Desktop/heading/h2', size: 48, weight: 700, ls: 0 },
    { name: 'Desktop/heading/h3', size: 40, weight: 700, ls: 0 },
    { name: 'Desktop/heading/h4', size: 32, weight: 700, ls: 0 },
    { name: 'Desktop/heading/h5', size: 24, weight: 700, ls: 0 },
    { name: 'Desktop/heading/h6', size: 20, weight: 700, ls: 0 },
  ];
  const mobileHeadings = [
    { name: 'Mobile/heading/h1', size: 40, weight: 700, ls: -0.25 },
    { name: 'Mobile/heading/h2', size: 40, weight: 700, ls: 0 },
    { name: 'Mobile/heading/h3', size: 32, weight: 700, ls: 0 },
    { name: 'Mobile/heading/h4', size: 28, weight: 700, ls: 0 },
    { name: 'Mobile/heading/h5', size: 24, weight: 700, ls: 0 },
    { name: 'Mobile/heading/h6', size: 20, weight: 700, ls: 0 },
  ];
  const paragraphs = [
    { name: 'Desktop/paragraph/large (BOLD)', size: 20, weight: 600, ls: 0 },
    { name: 'Desktop/paragraph/large', size: 20, weight: 400, ls: 0 },
    { name: 'Desktop/paragraph/medium (BOLD)', size: 16, weight: 600, ls: 0 },
    { name: 'Desktop/paragraph/medium', size: 16, weight: 400, ls: 0 },
    { name: 'Desktop/paragraph/small (BOLD)', size: 14, weight: 600, ls: 0 },
    { name: 'Desktop/paragraph/small', size: 14, weight: 400, ls: 0 },
    { name: 'Desktop/paragraph/extra small (BOLD)', size: 12, weight: 600, ls: 0 },
    { name: 'Desktop/paragraph/extra small', size: 12, weight: 400, ls: 0 },
    { name: 'Desktop/paragraph/caption', size: 10, weight: 400, ls: 0 },
  ];
  const buttons = [
    { name: 'Button/large', size: 16, weight: 600, ls: 0 },
    { name: 'Button/medium', size: 12, weight: 600, ls: 0 },
    { name: 'Button/small', size: 10, weight: 600, ls: 0 },
  ];
  const forms = [
    { name: 'Form/large', size: 16, weight: 400, ls: 0 },
    { name: 'Form/small', size: 12, weight: 400, ls: 0 },
  ];

  const renderGroup = (title: string, items: typeof desktopHeadings) => (
    <Group key={title} title={title}>
      <Card>
        {items.map((item) => (
          <FontRow key={item.name} name={item.name} family="Inter" weight={item.weight} size={item.size} letterSpacing={item.ls} />
        ))}
      </Card>
    </Group>
  );

  return (
    <PageShell title="Typography" description="Composed typography variables combining font family, weight, size, and tracking.">
      {renderGroup('Desktop Headings', desktopHeadings)}
      {renderGroup('Mobile Headings', mobileHeadings)}
      {renderGroup('Paragraph', paragraphs)}
      {renderGroup('Button', buttons)}
      {renderGroup('Form', forms)}
    </PageShell>
  );
}

/* ================================================================== */
/*  OTHER COLLECTION                                                   */
/* ================================================================== */

function OtherPage() {
  return (
    <PageShell title="Other" description="Additional size primitives for button and form components.">
      <Group title="Button Font Sizes">
        <Card>
          <NumberRow name="Other/button/large/font-size" value={16} unit="px" maxBar={16} />
          <NumberRow name="Other/button/standard/font-size" value={12} unit="px" maxBar={16} />
          <NumberRow name="Other/button/small/font-size" value={10} unit="px" maxBar={16} />
        </Card>
      </Group>

      <Group title="Form Font Sizes">
        <Card>
          <NumberRow name="Other/form/large/font-size" value={16} unit="px" maxBar={16} />
          <NumberRow name="Other/form/small/font-size" value={12} unit="px" maxBar={16} />
        </Card>
      </Group>
    </PageShell>
  );
}

/* ================================================================== */
/*  Story definitions                                                  */
/* ================================================================== */

const meta = {
  title: 'Variables',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Surface: Story = { render: () => <SurfacePage /> };
export const Text: Story = { render: () => <TextPage /> };
export const Border: Story = { render: () => <BorderPage /> };
export const Icon: Story = { render: () => <IconPage /> };
export const Spacing: Story = { render: () => <SpacingPage /> };
export const Font: Story = { render: () => <FontPage /> };
export const Typography: Story = { render: () => <TypographyPage /> };
export const Other: Story = { render: () => <OtherPage /> };
