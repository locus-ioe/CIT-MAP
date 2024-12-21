export interface SchoolInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface VolunteerInfo {
  name: string;
  contact?: string;
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
  volunteers?: VolunteerInfo[];
  stats: ProvinceStats;
}
