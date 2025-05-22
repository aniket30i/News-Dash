import { DashboardShell } from "@/components/dashboard-shell"
import { NewsCategories } from "@/components/news-categories"
import { CategoryCards } from "@/components/category-cards"
import { NewsFeed } from "@/components/news-feed"
import { GlobalNewsSection } from "@/components/global-news-section"
import { PremiumFeatures } from "@/components/premium-features"
import { WelcomeHero } from "@/components/welcome-hero"

export default function Dashboard() {
  return (
    <DashboardShell>
      <div className="grid gap-10">
        <WelcomeHero />
        <NewsCategories />
        <CategoryCards />
        <NewsFeed />
        <GlobalNewsSection />
        <PremiumFeatures />
      </div>
    </DashboardShell>
  )
}
