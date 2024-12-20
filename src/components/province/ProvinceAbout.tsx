interface VolunteerInfo {
  name: string;
  contact?: string;
}

interface ProvinceAboutProps {
  image: string;
  province: string;
  description: string;
  volunteers: VolunteerInfo[];
}

export const ProvinceAbout = ({ image, province, description, volunteers }: ProvinceAboutProps) => (
  <div className="space-y-6">
    <div className="aspect-video w-full overflow-hidden">
      <img
        src={image}
        alt={`Landscape of ${province}`}
        className="w-full h-full object-cover"
      />
    </div>

    <div>
      <h3 className="text-xl font-medium mb-4 text-[#2DD4BF]">About {province}</h3>
      <p className="text-base text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>

    <div>
      <h3 className="text-xl font-medium mb-4 text-[#2DD4BF]">Our Volunteers</h3>
      <div className="space-y-3">
        {volunteers.map((volunteer, index) => (
          <div key={index} className="bg-[#2DD4BF]/5 p-4 backdrop-blur-sm">
            <h4 className="text-lg font-medium text-[#2DD4BF] mb-1">{volunteer.name}</h4>
          </div>
        ))}
      </div>
    </div>
  </div>
);