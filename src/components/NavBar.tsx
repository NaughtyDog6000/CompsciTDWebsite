import { Link, NavigateFunction, useNavigate } from "react-router-dom";
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
import Logo from "@/assets/react.svg";


type NavbarLink = {
  url: string;
  name: string;
  variant: unknown;
};

export function NavBar({
  IsSignedIn = false,
  IsAdmin = false,
  IsDebugmode = false,
  SetSignoutDialog,
}: {
  IsSignedIn: boolean;
  IsAdmin: boolean;
  IsDebugmode: boolean;
  SetSignoutDialog: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const navigate = useNavigate();

  // these links will always be in the NavBar regardless of user state
  const NavbarLinks: NavbarLink[] = [
    { url: "/", name: "Home", variant: "default" },
    { url: "/Leaderboard", name: "Leaderboard", variant: "default" },
  ];

  // if the user is signed in add these links to their navbar
  const SignedInLinks: NavbarLink[] = [
    { url: "/Profile", name: "Profile", variant: "default" },
    { url: "/Friends", name: "Friends", variant: "default" },
  ];

  // if the user is signed out add these links to their navbar
  const SignedOutLinks: NavbarLink[] = [
    { url: "/Signin", name: "Signin", variant: "default" },
    { url: "/Signup", name: "Signup", variant: "default" },
  ];

  // if the user is an admin, present the admin dashboard page
  const AdminLinks: NavbarLink[] = [
    { url: "/Admin", name: "Admin Pages", variant: "destructive" },
  ];
  // if in DevMode, add DebugPage to the list of links
  const DebugModeLinks: NavbarLink[] = [
    { url: "/Debug", name: "Debug", variant: "destructive" },
  ];

  const Links = [];
  Links.push(...NavbarLinks); // add the default, always included links to the list
  Links.push(...(IsSignedIn ? SignedInLinks : SignedOutLinks)); // add signed in links or signed out links
  if (IsDebugmode) Links.push(...DebugModeLinks); // if in dev mode include the Debug page links etc
  if (IsAdmin) Links.push(...AdminLinks); // if the user is an admin include the link to the admin pages

  return (
    <>
      <nav className="flex flex-col items-stretch justify-evenly bg-gray-800 p-6 md:h-12 md:flex-row md:p-1 ">
        <img src={Logo} className="w-screen md:w-auto" />

        <ul className="flex grow flex-col items-center justify-start gap-2 md:flex-row md:justify-evenly">
          {Links.map((link, index) => (
            <li key={index} className="w-full md:w-auto ">
              {/* @ts-ignore */}
              <Button variant={link.variant} asChild>
                <Link to={link.url}>{link.name}</Link>
              </Button>
            </li>
          ))}
        </ul>

        {/* the right side profile and settings dropdown */}
        <div className="flex items-center h-full w-full md:w-auto pr-2">
          {IsSignedIn && (
            <HamburgerMenu
              navigate={navigate}
              SetSignoutDialog={SetSignoutDialog}
            />
          )}
        </div>
      </nav>
    </>
  );
}

function HamburgerMenu({
  navigate,
  SetSignoutDialog,
}: {
  navigate: NavigateFunction;
  SetSignoutDialog: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"default"}>
            <HamburgerMenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{"username"}</DropdownMenuLabel>
          <DropdownMenuSeparator />
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
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
