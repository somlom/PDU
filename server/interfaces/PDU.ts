export interface IOutlet {
  index: number;
  name: string;
  active: boolean;
  consumption: number;
}
export interface IPDU {
  name: string;
  connected: boolean;
  consumption: number;
  outlets?: IOutlet[];
}
