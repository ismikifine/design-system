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
    orange: {
      50: "#FFEFEF",
      100: "#FFCCCD",
      200: "#FFB3B5",
      300: "#FF9094",
      400: "#FF7B7F",
      500: "#FF5A5F",
      600: "#E85256",
      700: "#B54043",
      800: "#8C3234",
      900: "#6B2628",
    },
    red: {
      50: "#FEEBEB",
      100: "#FAC0C2",
      200: "#F8A1A4",
      300: "#F5767A",
      400: "#F35C61",
      500: "#F03339",
      600: "#DA2E34",
      700: "#AA2428",
      800: "#841C1F",
      900: "#651518",
    },
    yellow: {
      50: "#FFF9E9",
      100: "#FFEEBA",
      200: "#FFE598",
      300: "#FFD969",
      400: "#FFD24C",
      500: "#FFC71F",
      600: "#E8B51C",
      700: "#B58D16",
      800: "#8C6D11",
      900: "#6B540D",
    },
    green: {
      50: "#ECFFEE",
      100: "#C4FFC9",
      200: "#A8FFAF",
      300: "#80FF8A",
      400: "#67FF73",
      500: "#41FF50",
      600: "#3BE849",
      700: "#2EB539",
      800: "#248C2C",
      900: "#1B6B22",
    },
    grey: {
      50: "#F1F1F1",
      100: "#D3D3D3",
      200: "#BEBEBE",
      300: "#A0A0A0",
      400: "#8D8D8D",
      500: "#717171",
      600: "#676767",
      700: "#505050",
      800: "#3E3E3E",
      900: "#2F2F2F",
    },
    blue: {
      50: "#EAFBF9",
      100: "#BEF2EB",
      200: "#9EEBE2",
      300: "#72E2D4",
      400: "#57DDCC",
      500: "#2DD4BF",
      600: "#29C1AE",
      700: "#209788",
      800: "#197569",
      900: "#135950",
    },
  },

  typography: {
    display: {
      large: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 96,
        lineHeight: 112,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 52,
        lineHeight: 64,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 44,
        lineHeight: 52,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 44,
        letterSpacing: 0,
      } satisfies FontToken,
    },
    heading: {
      xxLarge: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 40,
        lineHeight: 52,
        letterSpacing: 0,
      } satisfies FontToken,
      xLarge: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 36,
        lineHeight: 44,
        letterSpacing: 0,
      } satisfies FontToken,
      large: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 32,
        lineHeight: 40,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 28,
        lineHeight: 36,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Inter",
        fontStyle: "Bold",
        fontWeight: 700,
        fontSize: 24,
        lineHeight: 32,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Inter",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0.25,
      } satisfies FontToken,
    },
    label: {
      large: {
        fontFamily: "Inter",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 18,
        lineHeight: 24,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Inter",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 20,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Inter",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 14,
        lineHeight: 16,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Inter",
        fontStyle: "Medium",
        fontWeight: 500,
        fontSize: 12,
        lineHeight: 16,
        letterSpacing: 0,
      } satisfies FontToken,
    },
    paragraph: {
      large: {
        fontFamily: "Inter",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 18,
        lineHeight: 28,
        letterSpacing: 0,
      } satisfies FontToken,
      medium: {
        fontFamily: "Inter",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 16,
        lineHeight: 24,
        letterSpacing: 0,
      } satisfies FontToken,
      small: {
        fontFamily: "Inter",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 20,
        letterSpacing: 0,
      } satisfies FontToken,
      xSmall: {
        fontFamily: "Inter",
        fontStyle: "Regular",
        fontWeight: 400,
        fontSize: 12,
        lineHeight: 20,
        letterSpacing: 0,
      } satisfies FontToken,
    },
  },

  // Spacing scale
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
