interface ProvinceStatsProps {
  stats: {
    districts: number;
    students: number;
  };
}

export const ProvinceStats = ({ stats }: ProvinceStatsProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-lg">
        <h4 className="text-lg font-medium text-[#2DD4BF] mb-4">Coverage</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-3xl font-bold text-[#2DD4BF]">
              {stats.districts}+
            </span>
            <p className="text-sm text-gray-400 mt-1">Districts</p>
          </div>
          <div>
            <span className="text-3xl font-bold text-[#2DD4BF]">
              {stats.students}+
            </span>
            <p className="text-sm text-gray-400 mt-1">Students</p>
          </div>
        </div>
      </div>
    </div>
  );
};
