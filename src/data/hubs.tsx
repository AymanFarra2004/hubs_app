import { Wifi, Zap, Monitor, Coffee, Printer, Car, Snowflake, Flame } from "lucide-react";
import React from "react";

export interface SocialAccount {
    platform: string;
    url: string;
}

export interface Icontact {
    contactNumber: string;
    links?: string[];
    email?: string;
}

export interface IHub {
    id: string;
    name: string;
    description: string;
    location: string;
    governorate: string;
    pricing: string;
    operatingHours: string;
    services: string[];
    imageUrl: any;
    galleryUrls?: string[];
    verificationStatus: "Verified" | "Pending";
    contact:Icontact;
    activeOffer?: any;
    socialAccounts?: SocialAccount[];
}

export function getServiceIcons(tService: any): Record<string, React.ReactNode> {
  console.log('tService', Object.values(tService));
  return {
    [tService("wifi")]: <Wifi className="h-5 w-5" />,
    [tService("internet")]: <Wifi className="h-5 w-5" />,
    [tService("electricity")]: <Zap className="h-5 w-5" />,
    [tService("workspace")]: <Monitor className="h-5 w-5" />,
    [tService("coffee")]: <Coffee className="h-5 w-5" />,
    [tService("printer")]: <Printer className="h-5 w-5" />,
    [tService("parking")]: <Car className="h-5 w-5" />,
    [tService("airConditioning")]: <Snowflake className="h-5 w-5" />,
    [tService("heating")]: <Flame className="h-5 w-5" />,
  };
}