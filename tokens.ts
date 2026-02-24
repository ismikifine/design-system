export type FontToken = {
  fontFamily: string;
  fontStyle: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
};

export type ShadowToken = {
  type: "dropShadow";
  color: string; // #RRGGBBAA
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spread: number;
};

export const tokens = {
  color: {
    // Semantic colors (from Figma variables on `Base` page)
    background: {
      primary: "#FFFFFF",
      secondary: "#F3F3F3",
      tertiary: "#E8E8E8",
      inversePrimary: "#000000",
    },
    content: {
      primary: "#000000",
      tertiary: "#5E5E5E",
      inversePrimary: "#FFFFFF",
    },
    border: {
      opaque: "#E8E8E8",
    },

    // Scales (from color scale frames)
    brand: {
      900: "#550C0E",
      800: "#771518",
      700: "#992226",
      600: "#BB3236",
      500: "#DD4449",
      400: "#FF5A5F",
      300: "#FF7F83",
      200: "#FFA4A7",
      100: "#FFC9CB",
      50: "#FFEEEF",
    },
    error: {
      900: "#510000",
      800: "#7A0000",
      700: "#A30000",
      600: "#CB1010",
      500: "#F42828",
      400: "#FF5050",
      300: "#FF7676",
      200: "#FF9D9D",
      100: "#FFC3C3",
      50: "#FFE9E9",
    },
    warning: {
      900: "#554509",
      800: "#776112",
      700: "#997E1E",
      600: "#BB9C2D",
      500: "#DDBB3F",
      400: "#FFDA54",
      300: "#FFE27A",
      200: "#FFEAA1",
      100: "#FFF3C7",
      50: "#FFFBEE",
    },
    success: {
      900: "#004E07",
      800: "#00760A",
      700: "#009F0D",
      600: "#00C811",
      500: "#16F128",
      400: "#41FF50",
      300: "#6AFF77",
      200: "#94FF9D",
      100: "#BEFFC3",
      50: "#E8FFE9",
    },
    neutral: {
      950: "#131313",
      900: "#2B2B2B",
      800: "#424242",
      700: "#5A5A5A",
      600: "#717171",
      500: "#898989",
      400: "#A1A1A1",
      300: "#B8B8B8",
      200: "#D0D0D0",
      100: "#E7E7E7",
      50: "#F3F3F3",
    },
  },

  typography: {
    display: {
      large: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 96,
        lineHeight: 112,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 52,
        lineHeight: 64,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 44,
        lineHeight: 52,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 44,
        letterSpacing: 0,
      } satisfies FontToken,
    },
    heading: {
      xxLarge: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 40,
        lineHeight: 52,
        letterSpacing: 0,
      } satisfies FontToken,
      xLarge: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 44,
        letterSpacing: 0,
      } satisfies FontToken,
      large: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 36,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Uber Move",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0.25,
      } satisfies FontToken,
    },
    label: {
      large: {
        fontFamily: "Uber Move Text",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Uber Move Text",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Uber Move Text",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Uber Move Text",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0,
      } satisfies FontToken,
    },
    paragraph: {
      large: {
        fontFamily: "Uber Move Text",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Uber Move Text",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Uber Move Text",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Uber Move Text",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      } satisfies FontToken,
    },
  },

  // Spacing scale (from `Spacer` component variants)
  space: {
    4: 4,
    8: 8,
    12: 12,
    16: 16,
    20: 20,
    24: 24,
    28: 28,
    32: 32,
    36: 36,
    40: 40,
    48: 48,
    56: 56,
    64: 64,
    96: 96,
    128: 128,
  },

  // Extra token surfaced in the file (useful for elevation)
  shadow: {
    shallowBelow: {
      type: "dropShadow",
      color: "#0000001F",
      offsetX: 0,
      offsetY: 4,
      blurRadius: 16,
      spread: 0,
    } satisfies ShadowToken,
  },
} as const;

export type Tokens = typeof tokens;

