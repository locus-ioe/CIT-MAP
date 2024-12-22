export interface SchoolInfo {
  name: string;
  coordinates: {
    lat: string;
    lng: string;
  };
}

export interface ProvinceStats {
  schools: number;
  students: number;
  districtNames?: string[];
}

export interface ProvinceData {
  provinceImage: string;
  province: string;
  description: string;
  images?: string[];
  schools?: SchoolInfo[];
  volunteers?: string[];
  stats: ProvinceStats;
}
