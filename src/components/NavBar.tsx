import { Link } from "react-router-dom";

export default function Navbar(
  IsSignedIn: boolean,
  IsAdmin: boolean,
  IsDevmode: boolean
): JSX.Element {
  // these links will always be in the NavBar regardless of user state
  const NavbarLinks = [
    { url: "/", name: "Home" },
    { url: "/Leaderboard", name: "Leaderboard" },
  ];

  // if the user is signed in add these links to their navbar
  const SignedInLinks = [
    { url: "/Profile", name: "Profile" },
    { url: "/Settings", name: "Settings" },
    { url: "/Signout", name: "Signout" },
  ];

  // if the user is signed out add these links to their navbar
  const SignedOutLinks = [
    { url: "/Signin", name: "Signin" },
    { url: "/Signup", name: "Signup" },
  ];

  // if in DevMode, add DebugPage to the list of links
  const DevModeLinks = [{ url: "/Admin/Debug", name: "Debug" }];

  const Links = [];
  Links.push(...NavbarLinks); // add the default, always included links to the list
  Links.push(...(IsSignedIn ? SignedInLinks : SignedOutLinks)); // add signed in links or signed out links
  if (IsDevmode) Links.push(...DevModeLinks); // if in dev mode include the Debug page links etc

  return (
    <>
      <nav className="flex flex-col items-stretch justify-evenly bg-gray-800 p-6 md:h-16 md:flex-row md:p-1 ">
        <image
          href="../../src/assets/react.svg"
          className="w-screen md:w-auto"
        />

        <ul className="flex grow flex-col items-center justify-start gap-2 md:flex-row md:justify-evenly">
          {Links.map((link, index) => (
            <li className="w-full bg-gray-500 md:w-auto ">
              <a key={index}>
                <Link to={link.url}>{link.name}</Link>
              </a>
            </li>
          ))}
        </ul>

        {/* the right side profile and settings dropdown */}
        <div className=" h-full w-auto bg-black">
          <image></image>
        </div>
      </nav>
    </>
  );
}
