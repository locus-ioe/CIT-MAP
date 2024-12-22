import { ProvinceData } from "@/types/province";

export const ProvinceAbout = ({
  provinceImage,
  province,
  description,
  volunteers,
  stats,
}: ProvinceData) => (
  <div className="space-y-6 mb-6">
    <div className="aspect-video w-full overflow-hidden">
      <img
        src={provinceImage}
        alt={`Landscape of ${province}`}
        className="w-full h-full object-cover"
      />
    </div>

    <div>
      <h3 className="text-2xl font-semibold mb-4 text-[#2DD4BF]">
        About {province}
      </h3>
      <p className="text-base text-gray-400 leading-relaxed">{description}</p>
    </div>

    <div>
      <h3 className="text-2xl font-semibold mb-4 text-[#2DD4BF]">Coverage</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg">
          <span className="text-3xl font-bold text-[#2DD4BF]">
            {stats.districtNames?.length | 0}
          </span>
          <p className="text-sm text-gray-400 mt-1">Districts</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg">
          <span className="text-3xl font-bold text-[#2DD4BF]">
            {stats.schools}
          </span>
          <p className="text-sm text-gray-400 mt-1">Schools</p>
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg">
          <span className="text-3xl font-bold text-[#2DD4BF]">
            {stats.students}+
          </span>
          <p className="text-sm text-gray-400 mt-1">Students</p>
        </div>
      </div>
    </div>

    {stats.districtNames?.length != 0 && (
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-[#2DD4BF]">
          Districts Covered
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
          {stats.districtNames?.map((district, index) => (
            <div
              key={index}
              className="bg-[#2DD4BF]/5 px-4 py-2.5 backdrop-blur-sm rounded-lg flex items-center justify-center text-center hover:bg-[#2DD4BF]/10 transition-colors duration-200 cursor-default min-w-[150px] break-words"
            >
              <p className="text-sm font-semibold text-gray-400 hover:text-[#2DD4BF] px-2 tracking-wider">
                {district}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}

    {volunteers && (
      <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-[#2DD4BF] tracking-tight">Our Volunteers</h3>
      <ul className="list-disc pl-5 space-y-2 ml-3">
        {volunteers.map((volunteer, index) => (
          <li 
            key={index} 
            className="text-gray-300 marker:text-[#2DD4BF]"
          >
            {volunteer}
          </li>
        ))}
      </ul>
    </div>
    )}
  </div>
);
