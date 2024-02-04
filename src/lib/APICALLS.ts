// A set of API calling functions that do the repetative parts for common API calls

// considered creating an API object that has all the function calls on it with a property of token
//  instead of passing the token on everty api call but that would be more work

// just realised that I would need to pass the API URL as well so fuck it, API class it is

class CompsciAPI {
  token: string | null = null;
  APIURL: string;

  constructor(token: string | undefined, APIURL: string) {
    if (token) {
      this.token = token;
    }
    this.APIURL = APIURL;
  }

  // up for debate if I actually put this logic here or not but idk

  // async Signin(username: string, password: string) {}
  // async Signup(username: string, email: string, password: string) {}

  // Check the API IS ALIVE
  async CheckAPIHealth() {
    const response = await fetch(this.APIURL + "/");

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  // Check IF a User Exists / get their relationship status / profile visability etc
  async CheckIfUserExists(username: string): Promise<object> {
    if (!this.token) {
      console.error("this route requires auth to use");
      return {
        error: "requires token",
      };
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json; charset=UTF-8");
    headers.append("auth", this.token);

    const response = await fetch(this.APIURL + "/check_user", {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify(username),
    });
    // TODO!() handle errrors + processing
    console.log(await response.json());
    return {
      didgetresponse: false,
      response: "lalala",
    };
  }

  async GetProfileData(username: string) {}
}

// fetch user's profile data
