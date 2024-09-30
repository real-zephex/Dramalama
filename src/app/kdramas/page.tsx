import { PopularRecentDramas } from "@/utils/kdrama-requests/request";
import KdramaHomecard from "@/components/kdrama-ui/homepage-cards";

const KdramaHomePage = async () => {
  const popular = await PopularRecentDramas({ type: "popular" });
  const recent = await PopularRecentDramas({ type: "recent" });

  return (
    <main className=" bg-gradient-to-b from-base-300 to-base-100">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-center w-full py-4 md:py-10 lg:py-12 ">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Trending Dramas
          </h2>
          <p className="w-full text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
            Check out the hottest K-dramas that are taking the world by storm.
          </p>
          <KdramaHomecard dramaData={popular} />
        </div>

        <div className="flex flex-col items-center justify-center w-full py-4 md:py-10 lg:py-12  ">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Recent Dramas
          </h2>
          <p className="w-full text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
            Catch up on the latest K-drama releases and discover new favorites.
          </p>
          <KdramaHomecard dramaData={recent} />
        </div>
      </div>
    </main>
  );
};

export default KdramaHomePage;
