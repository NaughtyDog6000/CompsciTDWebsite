import { Link, useNavigate } from "react-router-dom";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function NavBar({
  IsSignedIn = false,
  IsAdmin = false,
  IsDevmode = false,
  SetSignoutDialog,
}: {
  IsSignedIn: boolean;
  IsAdmin: boolean;
  IsDevmode: boolean;
  SetSignoutDialog: any;
}): JSX.Element {
  const navigate = useNavigate();

  // these links will always be in the NavBar regardless of user state
  const NavbarLinks = [
    { url: "/", name: "Home" },
    { url: "/Leaderboard", name: "Leaderboard" },
  ];

  // if the user is signed in add these links to their navbar
  const SignedInLinks = [
    { url: "/Profile", name: "Profile" },
    { url: "/Friends", name: "Friends" },
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
      <nav className="flex flex-col items-stretch justify-evenly bg-gray-800 p-6 md:h-12 md:flex-row md:p-1 ">
        <img src="../../src/assets/react.svg" className="w-screen md:w-auto" />

        <ul className="flex grow flex-col items-center justify-start gap-2 md:flex-row md:justify-evenly">
          {Links.map((link, index) => (
            <li key={index} className="w-full md:w-auto ">
              <Button asChild>
                <Link to={link.url}>{link.name}</Link>
              </Button>
            </li>
          ))}
        </ul>

        {/* the right side profile and settings dropdown */}
        <div className="flex items-center h-full w-full md:w-auto pr-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"default"}>
                <HamburgerMenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <HamburgerMenuContent
                IsSignedIn={IsSignedIn}
                navigate={navigate}
                SetSignoutDialog={SetSignoutDialog}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
}

function HamburgerMenuContent({
  IsSignedIn,
  navigate,
  SetSignoutDialog,
}: {
  IsSignedIn: boolean;
  navigate: any;
  SetSignoutDialog: any;
}): JSX.Element {
  if (IsSignedIn)
    return (
      <>
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* conditionally add the menu items for signed in or signout views */}
        <DropdownMenuItem
          onSelect={() => {
            navigate("/Profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Friends</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => {
            SetSignoutDialog(true);
          }}
        >
          <span className="font-bold">Signout</span>
        </DropdownMenuItem>
      </>
    );

  return <></>;
}
