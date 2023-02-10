import mainLight from "./mainLight.jpg";
import mainDark from "./mainDark.jpg";
import loginLight from "./loginLight.jpg";
import loginDark from "./loginDark.jpg";
import { ThemeMode } from "../../providers/themeProvider";

type BackgroundList = "appBackground" | "loginBackground";
type BackgroundKeys = { [Background in BackgroundList]: string };
type BackgroundMap = { [P in ThemeMode]: BackgroundKeys };

export const APP_BACKGROUNDS: BackgroundMap = {
  light: { appBackground: mainLight, loginBackground: loginLight },
  dark: { appBackground: mainDark, loginBackground: loginDark },
};
