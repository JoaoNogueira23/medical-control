import { PaletteOptions } from "@mui/material/styles";
import palette from "./palette.json"


const lightPalette: PaletteOptions = {
    mode: 'light',
    background:{
        default: "rgb(255,255,255)",
        paper: "rgb(240,240,240)"
    },
    primary: {
        main: palette.primary?.light,
        light: palette.primary?.light,
        dark: palette.primary?.dark,
        contrastText: palette.primary?.contrastText
      },
      secondary: {
        main: palette.secondary?.light,
        light: palette.secondary?.light,
        dark: palette.secondary?.dark,
        contrastText: palette.secondary?.contrastText
      },
      error: {
        main: palette.error?.light,
        light: palette.error?.light,
        dark: palette.error?.dark,
        contrastText: palette.error?.contrastText
      },
      warning: {
        main: palette.warning?.light,
        light: palette.warning?.light,
        dark: palette.warning?.dark,
        contrastText: palette.warning?.contrastText
      },
      info: {
        main: palette.info?.light,
        light: palette.info?.light,
        dark: palette.info?.dark,
        contrastText: palette.info?.contrastText
      },
      success: {
        main: palette.success?.light,
        light: palette.success?.light,
        dark: palette.success?.dark,
        contrastText: palette.success?.contrastText
      },
      text: {
        primary: palette.primary?.light,
        secondary: palette.secondary?.light,
        disabled: palette.text?.disabled
      }
}

export default lightPalette;