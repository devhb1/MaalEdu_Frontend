import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { TrustLogos } from "@/components/trust-logos"
import { KeyFeatures } from "@/components/key-features"
import { ProgramOverview } from "@/components/program-overview"
import { CertificationPreview } from "@/components/certification-preview"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { AffiliateSection } from "@/components/affiliate-section"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustLogos />
        <KeyFeatures />
        <ProgramOverview />
        <CertificationPreview />
        <Testimonials />
        <CTASection />
        <AffiliateSection />
      </main>
      <SiteFooter />
    </div>
  )
}
