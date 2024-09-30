import { TopPopularAiringTV, TrendingTV } from "@/utils/tv-requests/request";

import WebHomepageCards from "@/components/web-ui/homepage-cards";

const WebSeriesHomepage = async () => {
  const popular = await TopPopularAiringTV({ type: "popular" });
  const top = await TopPopularAiringTV({ type: "top_rated" });
  const airing = await TopPopularAiringTV({ type: "airing_today" });
  const trending = await TrendingTV({ time_window: "day" });

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100s">
      <div className="container mx-auto py-2 px-1">
        <h1 className="text-2xl md:text-4xl  font-semibold">
          Discover the Best TV Shows
        </h1>
        <section className="py-4">
          <h2 className="text-3xl  my-2">Top Shows</h2>
          <WebHomepageCards data={top} />
        </section>
        <section className="py-4">
          <h2 className="text-3xl my-2">Popular Shows</h2>
          <WebHomepageCards data={popular} />
        </section>
        <section className="py-4">
          <h2 className="text-3xl  my-2">Airing Now</h2>
          <WebHomepageCards data={airing} />
        </section>
        <section className="py-4">
          <h2 className="text-3xl  my-2">Trending Now</h2>
          <WebHomepageCards data={trending} />
        </section>
      </div>
    </main>
  );
};

export default WebSeriesHomepage;
