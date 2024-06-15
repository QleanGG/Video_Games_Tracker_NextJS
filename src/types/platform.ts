import { Game } from "./game";

export enum PlatformName {
  PlayStation5 = 'PlayStation 5',
  PC = 'PC',
  NintendoSwitch = 'Nintendo Switch',
  XboxSeriesX = 'Xbox Series X',
  ps5 = 'ps5',
  pc = 'pc',
  switch = 'switch',
  xsx = 'xsx'
}
export interface Platform {
  id: number;
  name: PlatformName;
  games: Game[];
}