import { AnimeRequestHandler } from "@/utils/anime-requests/request";
import { GogoanimeInfo } from "@/utils/types";
import AnimeVideoPage from "@/components/anime-ui/video-player";
import AnimeInfoComponent from "@/components/anime-ui/anime-info";
import { AniwatchResults } from "@/utils/anime-requests/request";

const AnimeInfoPage = async ({ params }: { params: { id: string } }) => {
  const data: GogoanimeInfo = await AnimeRequestHandler({
    info: true,
    animeId: params.id,
  });

  const aniwatchData = await AniwatchResults(params.id);

  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100">
      <AnimeVideoPage data={data} aniwatchData={aniwatchData} />
      <AnimeInfoComponent animeInfo={data} />
    </main>
  );
};

export default AnimeInfoPage;
