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
  districts: number;
  schools: number;
  students: number;
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
