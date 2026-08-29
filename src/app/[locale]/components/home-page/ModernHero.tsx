"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { CONFIG } from "@/src/config";
import Image from "next/image";

import { useEffect, useState } from "react";
import { useRouter, Link } from "@/src/i18n/routing";
import { Search, Sparkles } from "lucide-react";

interface CarouselHubItem {
  imageUrl: string;
  name: string;
  slug: string;
  isFeatured: boolean;
}

const CAROUSEL_POSITIONS = [
  "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-1/2 right-0 translate-x-1/2 -translate-y-1/2"
];

export default function ModernHero({ hubs = [] }: { hubs?: any[] }) {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const [carouselHubs, setCarouselHubs] = useState<Array<CarouselHubItem>>([
    { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBc-YbptXZPFMcFAevZ4MdKYs2-djxfXufsaz4xgS5x4LQ8Wn4P91yh-_yDsHiJ37KZ_eNgDew3G-0kdkRfgmP1pP50y9ZBWVNot_Joac78Jmp1ZaHViyVVEoMKTE_fHQywdpYl4D16FRvEaRhJ8oqpAwztKIwg2WRaA7M1ZSdIGP5OrZrluHOX4oTfI4b-W2SJ_XbduamOr2Gd5o-MdZd2EO54kguUOhf7Pi0ps6ylvGULAM_1so1I9sWxDHLb0xTFX0ePl9G0_rPO", name: "Premium Workspace", slug: "#", isFeatured: true },
    { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZ_gH3jmM-h25j5LbFEpZvorSIpGVv9Lwk6bnvWZQ7qKT3lylNG8Zk9haFs3cfaKphgEc7vNZTdW_zgd0mQldU9bWdsRoDxAC1bqBv_-7u2LOXXYW78GT3CjV0rUfSBpAw3uZ09LySQUd27r3thO3XRpKCtFKfR4e3avikKO4SdzJFgSVjRG1a6wGIhsLzKBSwJeDruuEky0z_8VRmb0TPQdelpD8M3xCpAttZnGGCKz4PbBfGZ5qYsQ26iW8u28lQWOMFe3uhM9Yc", name: "Quiet Zone", slug: "#", isFeatured: false },
    { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBXzHG3YdRn1OpTuBxKvx5IeGDiyruuLErbFOHJJY8L4AiCumbnWQQ7zs6IFKfRbN0BAH6rFC_Z6TLcVTT_SQWCAXj9ZaBtdeZcYpXsYr6B0feMMfJAjlvgQAOlTIjjDp3aVTpnGrCbaLGAwd1oJcfCA1PTfUcjmVNZ0pc0PMvIFVA_noGpPN_zHr9RHJaooXeUtzGLC_QB19IOkIX4Ar9g2RSZFMn__tnanJWQVyu3OvZ8Xy_DQSdVQBDbmetpj9gclxaNQMZH9Ya9", name: "Creator Studio", slug: "#", isFeatured: false },
    { imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDR_lDhi15LL8aTmyXFqKkifVgBEutvEfg3wNLVxCZRtLseDzWmo3Pfw57UkmBNRKP0_IfkhgH-63vbWnOI8G7QcCQRLXI2E46XsdiFjD3UFe-pTgCSH2wY7BwmVLctjpDg_JDlJb-gg-uOaiTK7fdvd6P17QGZqMLuAfbq1MdpkidSARXF95jqFgZK7Ibv2ENroKkryUhtBAvkHhiZqdwqLpll5EOYz-mwGCDBuqrEEv9_EHIXtBisn9wpdt_4jySY7jK4kKj53Z2c", name: "Collab Space", slug: "#", isFeatured: false }
  ]);

  useEffect(() => {
    const approvedHubs = hubs.filter(hub => hub.status === "approved" && hub.images?.main);
    if (approvedHubs.length === 0) return;

    const now = new Date();

    // 1. Filter featured hubs that are currently active (within date range)
    const featuredHubs = approvedHubs
      .filter(hub => {
        if (!hub.is_featured) return false;
        
        const parseDate = (dStr?: string) => {
          if (!dStr) return null;
          const iso = dStr.includes('T') ? dStr : dStr.replace(' ', 'T');
          const d = new Date(iso);
          return isNaN(d.getTime()) ? null : d;
        };

        const from = parseDate(hub.featured_from);
        const until = parseDate(hub.featured_until); 
        
        if (from) from.setHours(0, 0, 0, 0);
        if (until) until.setHours(23, 59, 59, 999);

        if (from && now < from) return false;
        if (until && now > until) return false;
        return true;
      })
      .sort((a, b) => (b.featured_priority || 0) - (a.featured_priority || 0))
      .slice(0, 4);

    // 2. Fill remaining slots with random non-featured approved hubs
    const featuredSlugs = new Set(featuredHubs.map(h => h.slug));
    const remaining = approvedHubs.filter(h => !featuredSlugs.has(h.slug));
    const shuffled = [...remaining].sort(() => 0.5 - Math.random());
    const fillers = shuffled.slice(0, 4 - featuredHubs.length);

    const selectedHubs = [...featuredHubs, ...fillers];

    const mappedHubs: CarouselHubItem[] = selectedHubs.map(hub => ({
      imageUrl: hub.images.main.startsWith('http') ? hub.images.main : `${CONFIG.API_URL}${hub.images.main.startsWith('/') ? '' : '/'}${hub.images.main}`,
      name: typeof hub.name === 'string' ? hub.name : (hub.name?.[locale] || hub.name?.en || hub.name?.ar || "Unknown Hub"),
      slug: hub.slug,
      isFeatured: featuredSlugs.has(hub.slug)
    }));

    const padded: CarouselHubItem[] = [...mappedHubs];
    while (padded.length < 4) {
      padded.push(carouselHubs[padded.length]);
    }
    setCarouselHubs(padded.slice(0, 4));
  }, [hubs, locale]);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/hubs?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/hubs`);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-background transition-colors duration-300">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full z-10 relative">
        {/* Left Side: Headline & Search */}
        <div className="space-y-10 z-10 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
              {t.rich('titleQareeb', {
                br: () => <br />,
                primary: (chunks: any) => (
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-purple-600 to-blue-500 dark:from-purple-500 dark:to-blue-400 ">
                    {chunks}
                  </span>
                )
              })}
            </h1>
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              {t("descriptionQareeb")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Search Module (Bento Style) */}
            <form onSubmit={handleSearch} className="bg-background/80 backdrop-blur-md shadow-[0_20px_40px_rgba(25,28,30,0.06)] dark:shadow-none rounded-2xl p-3 flex flex-col md:flex-row gap-3 items-center border border-border/50 relative overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 rounded-xl flex-1 w-full">
                <Search className="text-muted-foreground w-5 h-5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("searchByNamePlaceholder")}
                  className="bg-transparent border-none focus:ring-0 text-foreground w-full p-0 outline-none placeholder:text-muted-foreground"
                />
              </div>
              <button type="submit" className="cursor-pointer bg-[#9333EA] text-white p-4 rounded-xl hover:bg-[#7e22ce] transition-colors w-full md:w-auto flex justify-center items-center group shrink-0 shadow-md">
                <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Right Side: Circular Carousel */}
        <div className="relative h-[450px] sm:h-[500px] md:h-[550px] lg:h-[650px] items-center justify-center flex w-full mt-10 lg:mt-0 pointer-events-auto">
          <div className="relative flex items-center justify-center scale-[0.55] sm:scale-[0.7] md:scale-[0.82] lg:scale-[0.92] xl:scale-100 origin-center">
            {/* Central Anchor point */}
            <div className="absolute w-[400px] h-[400px] rounded-full border border-black/10 dark:border-white/10"></div>
            <div className="absolute w-[550px] h-[550px] rounded-full border border-black/5 dark:border-white/5"></div>

            {/* Carousel Container */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
              className="absolute w-[600px] h-[600px]"
            >
              {carouselHubs.slice(0, 4).map((hub, index) => (
                <motion.div
                  key={index}
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
                  className={`absolute ${CAROUSEL_POSITIONS[index] || CAROUSEL_POSITIONS[0]} group`}
                >
                  <Link
                    href={hub.slug !== "#" ? `/hubs/${hub.slug}` : "#"}
                    className={`cursor-pointer relative w-48 h-48 rounded-full block group-hover:scale-105 transition-all duration-300 ${
                      hub.isFeatured
                        ? "p-[3.5px] bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 shadow-[0_0_30px_rgba(245,158,11,0.45)] dark:shadow-[0_0_35px_rgba(251,191,36,0.35)] ring-2 ring-amber-400/50"
                        : "overflow-hidden shadow-2xl bg-background border border-border/50"
                    }`}
                  >
                    {/* Featured Sparkle Badge */}
                    {hub.isFeatured && (
                      <div className="absolute -top-1 -right-1 z-30 flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-amber-950 shadow-md ring-2 ring-background">
                        <Sparkles className="w-3.5 h-3.5 fill-amber-950 text-amber-950" />
                      </div>
                    )}

                    {/* Image Container */}
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                      <Image
                        src={hub.imageUrl}
                        alt={hub.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Name Pill */}
                    <div className="absolute inset-x-0 bottom-4 flex justify-center px-2 z-20">
                      <span
                        className={`backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all whitespace-nowrap truncate max-w-[90%] flex items-center gap-1.5 ${
                          hub.isFeatured
                            ? "bg-background/95 border border-amber-400/80 text-amber-600 dark:text-amber-300 shadow-[0_2px_12px_rgba(245,158,11,0.25)] group-hover:border-amber-400 group-hover:bg-amber-50/90 dark:group-hover:bg-amber-950/40"
                            : "bg-background/90 border border-border/50 text-foreground group-hover:text-[#9333EA] group-hover:border-[#9333EA]/30"
                        }`}
                      >
                        {hub.isFeatured && (
                          <Sparkles className="w-3 h-3 text-amber-500 fill-amber-400 shrink-0" />
                        )}
                        <span className="truncate">{hub.name}</span>
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Center Overlay Element */}
            <div className="absolute w-32 h-32  rounded-full flex flex-col items-center justify-center  z-10">
              <span className="text-[#9333EA] font-extrabold text-2xl tracking-tight">
                <Image src="/qareeb-logo-location.webp" alt="Logo" width={120} height={120} className="w-auto h-[120px] object-cover" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
