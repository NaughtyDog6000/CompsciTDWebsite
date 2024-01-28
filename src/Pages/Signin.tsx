import { UserTypeEnum, useAppState } from "@/Structs/State";
import { NavBar } from "@/components/NavBar";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

export default function SigninPage(): JSX.Element {
  const navigate = useNavigate();
  const { AppState, SetAppState } = useAppState();
  // if the user is signed in, redirect them to the home page as they cannot signin again

  return (
    <>
      <Helmet>
        <title>Signin Page</title>
      </Helmet>

      <NavBar />
      <h2>dioahwd</h2>
    </>
  );
}
