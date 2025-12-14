import React, { useState, useEffect } from "react";
import axios from "axios";
import { cn } from "../lib/utils";
import { ProvinceHeader } from "./province/ProvinceHeader";
import { ProvinceTabs } from "./province/ProvinceTabs";
import { ProvinceAbout } from "./province/ProvinceAbout";
import { ProvinceSchools } from "./province/ProvinceSchools";
import { ProvincePhotos } from "./province/ProvincePhotos";
import { useIsMobile } from "../hooks/use-mobile";
import { ProvinceData } from "@/types/province";

interface ProvinceSidebarProps {
  province: string;
  provinceData: ProvinceData;
  isOpen: boolean;
  onClose: () => void;
  selectedYear: string;
  availableYears: string[];
  onYearChange: (year: string) => void;
}

export const ProvinceSidebar: React.FC<ProvinceSidebarProps> = ({
  province,
  provinceData,
  isOpen,
  onClose,
  selectedYear,
  availableYears,
  onYearChange,
}) => {
  const [activeTab, setActiveTab] = useState<"about" | "schools" | "photos">(
    "about"
  );
  const isMobile = useIsMobile();

  useEffect(() => {
    setActiveTab("about");
  }, [province]);

  const mobileClasses = isOpen ? "translate-y-0" : "translate-y-full";
  const desktopClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  if (!provinceData) {
    return <div>Loading...</div>; // Or any other loading state indication
  }

  return (
    <div
      className={cn(
        "fixed transition-transform duration-300 ease-in-out z-50 bg-gray-900 shadow-lg",
        isMobile
          ? cn(
              "bottom-0 left-0 right-0 h-[60vh] border-t border-[#2DD4BF]/20 rounded-t-xl",
              mobileClasses
            )
          : cn(
              "top-0 left-0 h-full w-[500px] border-r border-[#2DD4BF]/20",
              desktopClasses
            )
      )}
    >
      <ProvinceHeader province={province} onClose={onClose} />

      {/* Year Selector */}
      {availableYears.length > 0 && (
        <div className="px-4 py-2 border-b border-[#2DD4BF]/20">
          <div className="flex items-center gap-3">
            <span className="text-teal-400 text-sm font-medium">Year:</span>
            <div className="flex gap-1.5">
              {availableYears.map((year) => (
                <button
                  key={year}
                  onClick={() => onYearChange(year)}
                  className={`px-3.5 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
                    selectedYear === year
                      ? "bg-teal-500 text-gray-900 shadow-md shadow-teal-500/30"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-teal-400"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <ProvinceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        className={cn(
          "p-4 overflow-y-auto text-gray-300",
          isMobile ? "max-h-[calc(60vh-165px)]" : "max-h-[calc(100vh-165px)]"
        )}
      >
        {activeTab === "about" && (
          <ProvinceAbout
            provinceImage={provinceData.provinceImage}
            province={province}
            description={provinceData.description}
            volunteers={provinceData.volunteers}
            stats={provinceData.stats}
          />
        )}
        {activeTab === "schools" && (
          <ProvinceSchools province={province} schools={provinceData.schools} />
        )}
        {activeTab === "photos" && (
          <ProvincePhotos
            province={province}
            provinceImages={provinceData.images}
          />
        )}
      </div>
    </div>
  );
};
