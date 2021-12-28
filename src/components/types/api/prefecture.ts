export type Prefecture = {
  prefectures: {
    prefCode: number;
    prefName: string;
  }[];

  onChange: (name: string, prefName: number, check: boolean) => void;
};
