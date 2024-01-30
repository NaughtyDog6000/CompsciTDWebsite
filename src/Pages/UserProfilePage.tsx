import { useParams }  from "react-router-dom";
import { Helmet } from "react-helmet";

import { NavBar } from "@/components/NavBar"; 

export default function UserProfilePage() {

const { username } = useParams();

// check if the user exists, if not then redirect them to page not found

// check if the user is the same as the one logged in, if so redirect them to the /Profile Page where the owner's controls and things are.

return (
  <>
    <Helmet>
      <title>{username}'s Profile'</title>
    </Helmet>

    <NavBar />

    <h1>A user's public profile</h1>
    <p>User: {username}</p>

    { /* Table of recent games */ }

    { /* User Statistics */ }

  </>
);
}
