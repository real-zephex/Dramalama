import Image from "next/image";
import HomepageCards from "@/components/ui/homepage-cards";

export default async function Home() {
  return (
    <main className="bg-gradient-to-b from-base-300 to-base-100">
      <div className="container mx-auto">
        <div className=" p-2">
          <div className="flex flex-row items-center justify-center py-12 md:py-24">
            <div className="flex flex-col">
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl tracking-tight">
                Unlimited Access to Your Favorite Media
              </h1>
              <p className="text-md lg:text-xl md:flex hidden">
                Dramaflix offers a vast library of anime, K-dramas, movies, and
                web series for you to enjoy anytime, anywhere.
              </p>
            </div>
            <div className="p-2">
              <Image
                src="/hero.png"
                width={500}
                height={300}
                alt="Hero Image"
                className="rounded-xl object-cover"
                priority
              ></Image>
            </div>
          </div>
        </div>
        <HomepageCards />
      </div>

      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Dramaflix
          </p>
        </aside>
      </footer>
    </main>
  );
}
