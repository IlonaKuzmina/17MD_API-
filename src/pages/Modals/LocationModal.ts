export type LocationApiResponse = {
  info: LocationInfo;
  results: LocationL;
};

export type LocationInfo = {
  count: number;
  pages: number;
  next: string;
  prev: string;
};

export type LocationL = {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
};
