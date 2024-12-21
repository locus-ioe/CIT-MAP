interface VolunteerInfo {
  name: string;
  contact?: string;
}

interface ProvinceAboutProps {
  image: string;
  province: string;
  description: string;
  volunteers: VolunteerInfo[];
  stats: { districts: number; students: number };
}

export const ProvinceAbout = ({
  image,
  province,
  description,
  volunteers,
  stats,
}: ProvinceAboutProps) => (
  <div className="space-y-6">
    <div className="aspect-video w-full overflow-hidden">
      <img
        src={image}
        alt={`Landscape of ${province}`}
        className="w-full h-full object-cover"
      />
    </div>

    <div>
      <h3 className="text-xl font-medium mb-4 text-[#2DD4BF]">
        Aboutcd {province}
      </h3>
      <p className="text-base text-gray-400 leading-relaxed">{description}</p>
    </div>

    <div>
      <h3 className="text-xl font-medium mb-4 text-[#2DD4BF]">Coverage</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg">
          <span className="text-3xl font-bold text-[#2DD4BF]">
            {stats.districts}+
          </span>
          <p className="text-sm text-gray-400 mt-1">Districts</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg">
          <span className="text-3xl font-bold text-[#2DD4BF]">
            {stats.students}+
          </span>
          <p className="text-sm text-gray-400 mt-1">Students</p>
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-xl font-medium mb-4 text-[#2DD4BF]">
        Our Volunteers
      </h3>
      <div className="space-y-3">
        {volunteers.map((volunteer, index) => (
          <div key={index} className="bg-[#2DD4BF]/5 p-4 backdrop-blur-sm">
            <h4 className="text-lg font-medium text-[#2DD4BF] mb-1">
              {volunteer.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  </div>
);
