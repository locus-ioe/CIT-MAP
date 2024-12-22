import { SchoolInfo } from "@/types/province";
import { Mail, Phone, MapPin } from "lucide-react";

interface ProvinceSchoolsProps {
  province: string;
  schools: SchoolInfo[];
}

export const ProvinceSchools = ({
  province,
  schools,
}: ProvinceSchoolsProps) => (
<div className="space-y-6 p-4 rounded-md">
    <h3 className="text-2xl font-semibold text-[#2DD4BF]">Schools in {province}</h3>
    <div className="space-y-4">
      {schools.map((school, index) => (
        <div 
          key={index} 
          className="bg-[#2DD4BF]/5 p-3 px-4 rounded-md hover:bg-[#2DD4BF]/10 transition-colors duration-300"
        >
          <h4 
            className="text-lg font-medium text-gray-400 hover:text-[#2DD4BF] hover:underline cursor-pointer rounded-2xlxl" 
            onClick={() => window.open(`https://www.google.com/maps?q=${school.coordinates.lat},${school.coordinates.lng}`, '_blank')}
          >
            {school.name}
          </h4>
        </div>
      ))}
    </div>
  </div>

);
