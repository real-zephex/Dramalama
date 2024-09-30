import Image from "next/image";
import Link from "next/link";

const HomepageCards = async () => {
  return (
    <div className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {generateCards(
        "Anime",
        "Dive into the captivating world of anime, from classic masterpieces to the latest hits.",
        "animes",
        "/anime.png"
      )}
      {generateCards(
        "K-Dramas",
        "Immerse yourself in the addictive and emotionally-charged stories of Korean dramas.",
        "kdramas",
        "/kdrama.png"
      )}
      {generateCards(
        "Movies",
        "Discover a vast collection of captivating movies from around the world.",
        "movies",
        "/movie.jpg"
      )}
      {generateCards(
        "Web Series",
        "Explore the latest and greatest in the world of web-based entertainment.",
        "web-series",
        "/series.jpg"
      )}
    </div>
  );
};

const generateCards = (
  title: string,
  message: string,
  redirect: string,
  image: string = "/placeholder.svg"
) => {
  return (
    <Link
      href={`/${redirect}`}
      className="transition duration-300 ease-in-out hover:bg-base-300/50 rounded-xl hover:-translate-y-1 hover:shadow-xl p-2 bg-base-300/75"
    >
      <Image
        src={image}
        width={400}
        height={300}
        alt={`${title} poster`}
        className="h-80 rounded-t-xl object-cover"
        priority
        quality={100}
      />
      <h3 className="text-2xl font-bold mt-4">{title}</h3>
      <p className="text-muted-foreground mt-2">{message}</p>
    </Link>
  );
};

export default HomepageCards;
