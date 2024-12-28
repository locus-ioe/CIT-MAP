import { X } from 'lucide-react';

interface ProvinceHeaderProps {
  province: string;
  onClose: () => void;
}

export const ProvinceHeader = ({ province, onClose }: ProvinceHeaderProps) => (
  <div className="flex items-center justify-between p-4 bg-[#00D1B2] text-white">
    <h2 className="text-3xl font-semibold">{province}</h2>
    <button
      onClick={onClose}
      className="p-1 hover:bg-white/10 rounded-full transition-colors"
    >
      <X className="w-5 h-5" />
    </button>
  </div>
);