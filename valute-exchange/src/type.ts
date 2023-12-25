export interface GraphProps {
    dataKeys: [string, number];
  }
  
  export interface IData {
    [key: string]: number;
  }
  
  export interface ChartProps {
    currData: [string, IData][];
  }
  
  export type IChartData = [string, IData];