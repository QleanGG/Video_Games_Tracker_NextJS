import { PlatformName } from "@/types/platform";

export const platformMappings: { [key: string]: PlatformName } = {
  pc: PlatformName.PC,
  ps5: PlatformName.PlayStation5,
  switch: PlatformName.NintendoSwitch,
  xsx: PlatformName.XboxSeriesX,
};
