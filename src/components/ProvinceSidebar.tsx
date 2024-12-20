import React, { useState } from "react";
import { cn } from "..//lib/utils";
import { ProvinceHeader } from "./province/ProvinceHeader";
import { ProvinceTabs } from "./province/ProvinceTabs";
import { ProvinceAbout } from "./province/ProvinceAbout";
import { ProvinceSchools } from "./province/ProvinceSchools";
import { ProvincePhotos } from "./province/ProvincePhotos";
import { useIsMobile } from "..//hooks/use-mobile";

interface SchoolInfo {
  name: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface VolunteerInfo {
  name: string;
  contact?: string;
}

interface ProvinceSidebarProps {
  province: string;
  isOpen: boolean;
  onClose: () => void;
}

const getProvinceData = (province: string) => {
  const provinceData: Record<
    string,
    {
      description: string;
      image: string;
      schools: SchoolInfo[];
      volunteers: VolunteerInfo[];
    }
  > = {
    "Koshi Pradesh": {
      description:
        "Koshi Province, located in eastern Nepal, is known for its diverse geography ranging from the Himalayas to the Terai plains. Home to Mount Makalu and various ethnic communities, it's a hub of cultural diversity and natural beauty.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      schools: [
        {
          name: "Dharan Public School",
          address: "Dharan-15, Sunsari",
          phone: "025-520123",
          email: "dharanpublic@edu.np",
        },
        {
          name: "Biratnagar Model College",
          address: "Biratnagar-4, Morang",
          email: "info@bmc.edu.np",
        },
      ],
      volunteers: [
        {
          name: "Pemba Sherpa",
          contact: "pemba.sherpa@volunteer.org",
        },
        {
          name: "Sita Rai",
          contact: "984-1234567",
        },
      ],
    },
    "Madhesh Pradesh": {
      description:
        "Madhesh Province spans the southern plains of Nepal, featuring rich agricultural land and cultural heritage. It plays a crucial role in Nepal's agriculture and trade with India.",
      image: "https://images.unsplash.com/photo-1623677375828-30c246f6a338",
      schools: [
        {
          name: "Birgunj Institute",
          address: "Birgunj Metropolitan City",
          phone: "051-522345",
        },
        {
          name: "Janaki Secondary School",
          address: "Janakpur-4",
          email: "janaki.school@edu.np",
        },
      ],
      volunteers: [
        {
          name: "Rajesh Kumar",
          contact: "rajesh@madhesh.org",
        },
      ],
    },
    "Bagmati Pradesh": {
      description:
        "Bagmati Province, home to Nepal's capital Kathmandu, is the political and cultural heart of Nepal. It includes major historical sites, including seven UNESCO World Heritage sites.",
      image: "https://images.unsplash.com/photo-1605640840605-14ac1855827b",
      schools: [
        {
          name: "Kathmandu Model School",
          address: "Baneshwor, Kathmandu",
          phone: "01-4469875",
          email: "info@kms.edu.np",
        },
        {
          name: "Lalitpur Secondary School",
          address: "Patan, Lalitpur",
          phone: "01-5555123",
        },
      ],
      volunteers: [
        {
          name: "Maya Tamang",
          contact: "maya.t@bagmati.org",
        },
        {
          name: "Ram Shrestha",
          contact: "984-5678901",
        },
      ],
    },
    "Gandaki Pradesh": {
      description:
        "Gandaki Province is renowned for its natural beauty, including the Annapurna mountain range and Pokhara Valley. It's a major tourist destination known for trekking and adventure sports.",
      image: "https://images.unsplash.com/photo-1625046436057-2c99d0a51d81",
      schools: [
        {
          name: "Pokhara Valley School",
          address: "Lakeside, Pokhara",
          phone: "061-123456",
          email: "pvs@edu.np",
        },
      ],
      volunteers: [
        {
          name: "Hari Gurung",
          contact: "hari.g@gandaki.org",
        },
      ],
    },
    "Lumbini Pradesh": {
      description:
        "Lumbini Province, birthplace of Lord Buddha, is a significant pilgrimage site. The province combines religious importance with agricultural productivity.",
      image: "https://images.unsplash.com/photo-1582653291997-079a1c04e5a1",
      schools: [
        {
          name: "Buddha Memorial School",
          address: "Lumbini Cultural Municipality",
          email: "buddhamemorial@edu.np",
        },
        {
          name: "Butwal Technical Institute",
          address: "Butwal-11",
          phone: "071-445566",
        },
      ],
      volunteers: [
        {
          name: "Deepak Thapa",
          contact: "deepak@lumbini.org",
        },
      ],
    },
    "Karnali Pradesh": {
      description:
        "Karnali Province is Nepal's largest province by area, characterized by remote mountainous terrain. It preserves unique cultural traditions and pristine natural environments.",
      image: "https://images.unsplash.com/photo-1623677375828-30c246f6a338",
      schools: [
        {
          name: "Jumla Community School",
          address: "Jumla Bazaar",
          phone: "087-520123",
        },
      ],
      volunteers: [
        {
          name: "Binod Budha",
          contact: "binod@karnali.org",
        },
      ],
    },
    "Sudurpashchim Pradesh": {
      description:
        "Sudurpashchim Province, in far-western Nepal, is known for its diverse geography from Himalayas to plains. It hosts unique cultural practices and the famous Khaptad National Park.",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      schools: [
        {
          name: "Dhangadhi Academy",
          address: "Dhangadhi Sub-Metropolitan City",
          email: "info@dhangadhiacademy.edu.np",
        },
      ],
      volunteers: [
        {
          name: "Nirmala Dhami",
          contact: "981-2345678",
        },
      ],
    },
  };

  return (
    provinceData[province] || {
      description: "Information not available",
      image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa",
      schools: [],
      volunteers: [],
    }
  );
};

export const ProvinceSidebar: React.FC<ProvinceSidebarProps> = ({
  province,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"about" | "schools" | "photos">(
    "about"
  );
  const provinceData = getProvinceData(province);
  const isMobile = useIsMobile();
  const mobileClasses = isOpen ? "translate-y-0" : "translate-y-full";

  const desktopClasses = isOpen ? "translate-x-0" : "-translate-x-full";

  return (
    <div
      className={cn(
        "fixed transition-transform duration-300 ease-in-out z-50 bg-gray-900 shadow-lg",
        isMobile
          ? cn(
              "bottom-0 left-0 right-0 h-[50vh] border-t border-[#2DD4BF]/20 rounded-t-xl",
              mobileClasses
            )
          : cn(
              "top-0 left-0 h-full w-[450px] border-r border-[#2DD4BF]/20",
              desktopClasses
            )
      )}
    >
      <ProvinceHeader province={province} onClose={onClose} />
      <ProvinceTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div
        className={cn(
          "p-4 overflow-y-auto text-gray-300",
          isMobile ? "max-h-[calc(45vh-120px)]" : "max-h-[calc(100vh-120px)]"
        )}
      >
        {activeTab === "about" && (
          <ProvinceAbout
            image={provinceData.image}
            province={province}
            description={provinceData.description}
            volunteers={provinceData.volunteers}
          />
        )}
        {activeTab === "schools" && (
          <ProvinceSchools province={province} schools={provinceData.schools} />
        )}
        {activeTab === "photos" && <ProvincePhotos province={province} />}
      </div>
    </div>
  );
};
