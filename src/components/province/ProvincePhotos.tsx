import { useState } from "react";
import { useModal } from "../../hooks/use-modal";
import ProvinceImageModal from "./ProvinceImageModal";

interface ProvincePhotosProps {
  province: string;
  provinceImages: string[];
}

export const ProvincePhotos = ({
  province,
  provinceImages,
}: ProvincePhotosProps) => {
  const { open, openModal, closeModal } = useModal();
  const [modalImageUrl, setModalImageUrl] = useState("");

  const handleImageClick = (imageUrl: string) => {
    setModalImageUrl(imageUrl);
    openModal();
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium text-[#2DD4BF]">
        Photos of {province}
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {provinceImages.map((photo, index) => (
          <div
            key={index}
            className="aspect-square bg-[#2DD4BF]/5 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(photo)}
          >
            <img
              src={photo}
              alt={`${province} photo ${index + 1}`}
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      {open && (
        <ProvinceImageModal
          open={open}
          imageUrl={modalImageUrl}
          onClose={closeModal}
        />
      )}
    </div>
  );
};
