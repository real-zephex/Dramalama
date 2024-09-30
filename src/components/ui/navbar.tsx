import Link from "next/link";
import Search from "../global-search";

const Navbar = async () => {
  return (
    <div className="navbar bg-base-300">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/animes"}> Animes</Link>
            </li>
            <li>
              <Link href={"/movies"}> Movies</Link>
            </li>
            <li>
              <Link href={"/kdramas"}> Kdramas</Link>
            </li>
            <li>
              <Link href={"/web-series"}> Web-Series</Link>
            </li>
          </ul>
        </div>
        <svg
          data-id="1"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <polygon points="6 3 20 12 6 21 6 3"></polygon>
        </svg>
        <Link href={"/"} className="font-semibold text-xl ml-1">
          Dramaflix
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/animes"}> Animes</Link>
          </li>
          <li>
            <Link href={"/movies"}> Movies</Link>
          </li>
          <li>
            <Link href={"/kdramas"}> Kdramas</Link>
          </li>
          <li>
            <Link href={"/web-series"}> Web-Series</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <Search />
      </div>
    </div>
  );
};
export default Navbar;
