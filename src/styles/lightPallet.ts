import { PaletteOptions } from "@mui/material/styles";
import palette from "./palette.json"


const lightPalette: PaletteOptions = {
    mode: 'light',
    background:{
        default: "rgb(255,255,255)",
        paper: "rgb(240,240,240)"
    },
    primary: {
        main: palette.primary?.main,
        light: palette.primary?.light,
        dark: palette.primary?.dark,
        contrastText: palette.primary?.contrastText
      },
      secondary: {
        main: palette.secondary?.main,
        light: palette.secondary?.light,
        dark: palette.secondary?.dark,
        contrastText: palette.secondary?.contrastText
      },
      error: {
        main: palette.error?.main,
        light: palette.error?.light,
        dark: palette.error?.dark,
        contrastText: palette.error?.contrastText
      },
      warning: {
        main: palette.warning?.main,
        light: palette.warning?.light,
        dark: palette.warning?.dark,
        contrastText: palette.warning?.contrastText
      },
      info: {
        main: palette.info?.main,
        light: palette.info?.light,
        dark: palette.info?.dark,
        contrastText: palette.info?.contrastText
      },
      success: {
        main: palette.success?.main,
        light: palette.success?.light,
        dark: palette.success?.dark,
        contrastText: palette.success?.contrastText
      },
      text: {
        primary: palette.text?.primary,
        secondary: palette.text?.secondary,
        disabled: palette.text?.disabled
      }
}

export default lightPalette;