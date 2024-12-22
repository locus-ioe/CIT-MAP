import { cn } from "../../lib/utils";

interface ProvinceTabsProps {
  activeTab: "about" | "schools" | "photos";
  setActiveTab: (tab: "about" | "schools" | "photos") => void;
}

export const ProvinceTabs = ({
  activeTab,
  setActiveTab,
}: ProvinceTabsProps) => {
  const tabs = [
    { id: "about" as const, label: "About" },
    { id: "schools" as const, label: "Schools" },
    { id: "photos" as const, label: "Photos" },
  ];

  return (
    <div className="flex justify-center border-b border-[#2DD4BF]/20">
      {tabs.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={cn(
            "flex items-center gap-2 px-6 py-4 text-lg font-medium transition-colors tracking-wide",
            activeTab === id
              ? "text-[#2DD4BF] border-b-2 border-[#2DD4BF]"
              : "text-gray-400 hover:text-[#2DD4BF] hover:bg-[#2DD4BF]/10"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
