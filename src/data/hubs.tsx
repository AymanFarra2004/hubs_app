import { Wifi, Zap, Monitor, Coffee, Printer, Car, Snowflake, Flame, ShieldCheck, Presentation, Bath, UserRound, CreditCard, Utensils, Users, User } from "lucide-react";
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
    services: any[];
    imageUrl: any;
    galleryUrls?: string[];
    verificationStatus: "Verified" | "Pending";
    contact:Icontact;
    activeOffer?: any;
    socialAccounts?: SocialAccount[];
    review?: number;
}

export function getServiceIcon(serviceName: string, className: string = "h-5 w-5"): React.ReactNode {
    if (!serviceName) return <ShieldCheck className={className} />;
    
    const n = serviceName.toLowerCase();
    
    // Internet & Connectivity
    if (n.includes("إنترنت") || n.includes("انترنت") || n.includes("واي فاي")) return <Wifi className={className} />;
    
    // Electricity
    if (n.includes("كهرباء") || n.includes("طاقة")) return <Zap className={className} />;
    
    // Workspace & Offices
    if (n.includes("قاعات تدريب")) return <Presentation className={className} />;
    if (n.includes("غرف اجتماعات") || n.includes("قاعات منفصلة")) return <Users className={className} />;
    if (n.includes("مكاتب فردية") || n.includes("مكتب فردي")) return <User className={className} />;
    if (n.includes("مساحة") || n.includes("عمل")) return <Monitor className={className} />;
    
    // Special Categories
    if (n.includes("سيدات")) return <UserRound className={className} />;
    
    // Amenities
    if (n.includes("قهوة") || n.includes("مشروبات") || n.includes("شاي")) return <Coffee className={className} />;
    if (n.includes("مطعم") || n.includes("كافيه")) return <Utensils className={className} />;
    if (n.includes("دفع") || n.includes("بنكي") || n.includes("نقدي")) return <CreditCard className={className} />;
    if (n.includes("طباعة") || n.includes("طابعة") || n.includes("طابع")) return <Printer className={className} />;
    if (n.includes("دورات مياه") || n.includes("حمام")) return <Bath className={className} />;
    
    // Environment
    if (n.includes("تكييف") || n.includes("مكيف")) return <Snowflake className={className} />;
    if (n.includes("تدفئة") || n.includes("دفاية")) return <Flame className={className} />;
    if (n.includes("موقف") || n.includes("سيار")) return <Car className={className} />;
    
    return <ShieldCheck className={className} />;
}