import { Mail, Phone, MapPin } from 'lucide-react';

interface SchoolInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface ProvinceSchoolsProps {
  province: string;
  schools: SchoolInfo[];
}

export const ProvinceSchools = ({ province, schools }: ProvinceSchoolsProps) => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium text-[#2DD4BF]">Schools in {province}</h3>
    <div className="space-y-4">
      {schools.map((school, index) => (
        <div key={index} className="bg-[#2DD4BF]/5 p-4 space-y-3 backdrop-blur-sm">
          <h4 className="text-lg font-medium text-[#2DD4BF]">{school.name}</h4>
          {school.address && (
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{school.address}</span>
            </div>
          )}
          {school.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4 shrink-0" />
              <span>{school.phone}</span>
            </div>
          )}
          {school.email && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="break-all">{school.email}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);