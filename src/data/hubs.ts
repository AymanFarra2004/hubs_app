interface Icontact {
    contactNumber: string;
    links?: string[];
    email?: string;
}
export interface IHub {
    id: number;
    name: string;
    description: string;
    location: string;
    governorate: "Khanyounis" | "Gaza" | "Deir al-Balah" | "Rafah" | "North Gaza";
    pricing: string;
    operatingHours: string;
    services: string[];
    imageUrl: string;
    verificationStatus: "Verified" | "Pending";
    contact:Icontact;
}

export const staticHubs: IHub[] = [
  {
    id: 1,
    name: "Gaza Sky Geeks",
    description: "A leading tech hub and co-working space offering high-speed internet and a professional community for freelancers.",
    location: "Al-Bahr Street, Gaza City",
    governorate: "Gaza",
    pricing: "10",
    operatingHours: "08:00 AM - 10:00 PM",
    services: ["High-speed Internet", "Electricity", "Meeting Rooms", "Coffee Shop"],
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    verificationStatus: "Verified",
    contact: {
      contactNumber: "+970599000111",
      email: "info@gazaskygeeks.com",
      links: ["https://gazaskygeeks.com", "https://facebook.com/GazaSkyGeeks"]
    }
  },
  {
    id: 2,
    name: "Al-Amal Hub",
    description: "Quiet workspace located in the heart of Khan Yunis, specializing in providing stable electricity during outages.",
    location: "Al-Nasr Street",
    governorate: "Khanyounis",
    pricing: "5",
    operatingHours: "09:00 AM - 08:00 PM",
    services: ["Solar Power", "Stable WiFi", "Private Desks"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c",
    verificationStatus: "Verified",
    contact: {
      contactNumber: "+970592000222",
      links: ["https://facebook.com/AlAmalHub"]
    }
  },
  {
    id: 3,
    name: "Rafah Connect",
    description: "A newly opened center focused on providing connectivity services for students and remote workers in the south.",
    location: "Near Al-Awda Square",
    governorate: "Rafah",
    pricing: "7",
    operatingHours: "24/7",
    services: ["Fiber Internet", "24/7 Access", "Printing Services"],
    imageUrl: "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2",
    verificationStatus: "Pending",
    contact: {
      contactNumber: "+970598000333",
      email: "contact@rafahconnect.ps"
    }
  },
  {
    id: 4,
    name: "Deir al-Balah Innovation Center",
    description: "A community-driven space offering affordable workspaces and mentorship for local entrepreneurs.",
    location: "Main Road, Deir al-Balah",
    governorate: "Deir al-Balah",
    pricing: "3",
    operatingHours: "08:00 AM - 06:00 PM",
    services: ["Shared Desks", "Workshops", "Community Events"],
    imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952",
    verificationStatus: "Verified",
    contact: {
      contactNumber: "+970595000444",
      email: "deir.innovation@example.com",
      links: ["https://instagram.com/deir_innovation"]
    }
  },
  {
    id: 5,
    name: "North Gaza Digital Hub",
    description: "Providing essential digital services and workspace for residents in the North Gaza governorate.",
    location: "Jabalia",
    governorate: "North Gaza",
    pricing: "0", // Free for students
    operatingHours: "10:00 AM - 04:00 PM",
    services: ["Basic Internet", "Charging Stations"],
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    verificationStatus: "Pending",
    contact: {
      contactNumber: "+970597000555"
    }
  }
];