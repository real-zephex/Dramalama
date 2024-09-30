import AnimeHomepageCards from "@/components/anime-ui/homepage-cards";

import { AnimeRequestHandler } from "@/utils/anime-requests/request";

const AnimeHomepage = async () => {
  const recent = await AnimeRequestHandler({ recent: true });
  const trending = await AnimeRequestHandler({ trending: true });

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100">
      <div className="container mx-auto">
        <div className="divider divider-primary py-4 mt-0 text-2xl lg:text-3xl font-bold">
          Top Airing Animes
        </div>
        <AnimeHomepageCards data={trending} />
        <div className="divider divider-primary py-4 text-2xl lg:text-3xl font-bold">
          Recent Episodes
        </div>
        <AnimeHomepageCards data={recent} />
      </div>
    </main>
  );
};

export default AnimeHomepage;
