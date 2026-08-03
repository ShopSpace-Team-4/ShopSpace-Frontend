import Image from "next/image";

import HeroStats from "@/Compontents/HeroStats/HeroStats";
import AIAdvisor from "@/Compontents/AIAdvisor/AIAdvisor";

export default function Home() {
  return (
   <>
      <HeroStats />
      <AIAdvisor />
    </>
  );
}
