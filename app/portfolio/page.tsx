
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Portfolio } from "@/components/portfolio/Portfolio"
import { PortfolioSeo } from "@/components/portfolio/portfolioSeo"

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Dynamic SEO metadata will be handled by the SEO provider
export const metadata = {
  title: "Portfolio - Engineering Projects & Case Studies | Filigree Solutions",
  description: "Explore our successful engineering projects including structural analysis, CAD modeling, EV components, telecom towers, and industrial solutions.",
  keywords: "engineering portfolio, structural analysis projects, CAD modeling, EV components, telecom analysis, industrial engineering, case studies",
}

 async function getPortfolioData() {
  // Construct the full URL for server-side requests
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `${process.env.APP_URL}`;

  try {
    const [portfolioResponse, categoriesResponse] = await Promise.all([
      fetch(`${baseUrl}/api/admin/portfolio?all=true`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-store'
      }),
      fetch(`${baseUrl}/api/admin/portfolio/categories`, {
        headers: {
          "Content-Type": "application/json",
        },
        cache: 'no-store'
      })
    ]);

    if (!portfolioResponse.ok || !categoriesResponse.ok) {
      throw new Error('Failed to fetch portfolio data');
    }

    const [portfolioData, categoriesData] = await Promise.all([
      portfolioResponse.json(),
      categoriesResponse.json()
    ]);

    // Filter only published portfolio items
    const publishedPortfolioItems = portfolioData.data.filter(
      (item: any) => item.status === "published"
    );

    return { 
      portfolioItems: publishedPortfolioItems,
      categories: categoriesData.data || []
    };
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    throw new Error(
      (error as any).response?.data?.error || "Failed to fetch portfolio data"
    );
  }
}

export default async function PortfolioPage() {
  try {
    const initialData = await getPortfolioData();
    
    console.log("Portfolio Data:", {
      itemsCount: initialData.portfolioItems.length,
      categoriesCount: initialData.categories.length,
      categories: initialData.categories
    });

    return (
      <div className="min-h-screen">
        <PortfolioSeo />
        <Navbar />
        <Portfolio 
          portfolioItems={initialData.portfolioItems} 
          categories={initialData.categories}
        />
        <Footer />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="min-h-[calc(100vh-64px-80px)] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-600">
              Unable to load portfolio data. Please try again later.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
