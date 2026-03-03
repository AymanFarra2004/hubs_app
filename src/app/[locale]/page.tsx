import Image from "next/image";
import { Header } from "@/components/header/Header";
import HeroSection from "@/components/home-page/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <HeroSection />
    </div>
  );
}