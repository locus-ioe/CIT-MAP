import React from 'react';

interface ProvinceCardProps {
  name: string;
  onClick: () => void;
}

export const ProvinceCard: React.FC<ProvinceCardProps> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md transition-all duration-200 text-left border border-[#2DD4BF]/20 hover:border-[#2DD4BF] group"
    >
      <h3 className="text-lg font-medium text-[#2DD4BF] group-hover:text-[#2DD4BF] transition-colors">
        {name}
      </h3>
    </button>
  );
};