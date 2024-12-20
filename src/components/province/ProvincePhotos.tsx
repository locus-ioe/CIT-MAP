interface ProvincePhotosProps {
  province: string;
}

export const ProvincePhotos = ({ province }: ProvincePhotosProps) => (
  <div className="space-y-4">
    <h3 className="text-xl font-medium text-[#2DD4BF]">Photos of {province}</h3>
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="aspect-square bg-[#2DD4BF]/5 flex items-center justify-center backdrop-blur-sm"
        >
          <span className="text-[#2DD4BF] opacity-50">Photo {i}</span>
        </div>
      ))}
    </div>
  </div>
);