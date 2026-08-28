import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ContentProvider } from "../content/ContentContext";
import { ThemeInjector } from "../theme/ThemeInjector";
import { Nav } from "../components/Nav";
import { Hero } from "../components/Hero";
import { Manifesto } from "../components/Manifesto";
import { CircleIntro } from "../components/CircleIntro";
import { Pebbles } from "../components/Pebbles";
import { Destinations } from "../components/Destinations";
import { InvestmentTiers } from "../components/InvestmentTiers";
import { RevenueModel } from "../components/RevenueModel";
import { Flywheel } from "../components/Flywheel";
import { Experience } from "../components/Experience";
import { FirstChapter } from "../components/FirstChapter";
import { Retreat } from "../components/Retreat";
import { Roadmap } from "../components/Roadmap";
import { Calculator } from "../components/Calculator";
import { MemberPortal } from "../components/MemberPortal";
import { Team } from "../components/Team";
import { FAQ } from "../components/FAQ";
import { Join } from "../components/Join";
import { Footer } from "../components/Footer";
import { ScrollNav } from "../components/ScrollNav";
import { AdminPanel } from "../admin/AdminPanel";

const title = "AMUMA — Barefoot Boutique Resorts";
const description =
  "AMUMA is a circle of travelers and a network of intimate boutique retreats in hidden destinations across the Philippines and Southeast Asia.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#admin") setAdminOpen(true);
  }, []);

  return (
    <ContentProvider>
      <ThemeInjector />
      <div className="site-root min-h-screen bg-sand-50 text-ink-900">
        <Nav onOpenAdmin={() => setAdminOpen(true)} />
        <main>
          <Hero />
          <Manifesto />
          <CircleIntro />
          <Pebbles />
          <Destinations />
          <InvestmentTiers />
          <RevenueModel />
          <Flywheel />
          <Experience />
          <FirstChapter />
          <Retreat />
          <Roadmap />
          <Calculator />
          <MemberPortal />
          <Team />
          <FAQ />
          <Join />
        </main>
        <Footer onOpenAdmin={() => setAdminOpen(true)} />
        <ScrollNav />
        <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
      </div>
    </ContentProvider>
  );
}
