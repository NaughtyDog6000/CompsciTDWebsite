// A set of API calling functions that do the repetative parts for common API calls

import { APIRootResponse } from "@/lib/APICallsTypes";

// considered creating an API object that has all the function calls on it with a property of token
//  instead of passing the token on everty api call but that would be more work

// just realised that I would need to pass the API URL as well so fuck it, API class it is

export class CompsciAPI {
  token: string | null = null;
  URL: string;

  constructor(token: string | null, APIURL: string) {
    if (token) {
      this.token = token;
    }
    this.URL = APIURL;
  }

  /**
   * @returns headers setup for sending json and with the user's auth token
   */
  calculateHeaders(): Headers {
    const headers: Headers = new Headers();
    if (this.token !== null) {
      headers.append("auth", this.token);
    }

    headers.append("Content-Type", "application/json; charset=UTF-8");
    return headers;
  }

  /**
   *
   * @param username the username the user is trying to signin with
   * @param password the password that they have entered
   * @returns if the signin was a success
   */
  public async Signin(username: string, password: string): Promise<boolean> {
    const headers: Headers = this.calculateHeaders();

    const response = await fetch(this.URL + "/signin", {
      method: "POST",
      headers: headers,
      mode: "cors",
      body: JSON.stringify({
        username,
        password,
      }),
    });

    if (!response.ok) {
      console.warn("signin failed ");
      return false;
    }
    const json: object = await response.json();
    console.log(json);
    // TODO!() test if the object actually says that the user exists.
    return true;
  }
  // async Signup(username: string, email: string, password: string) {}

  // Check the API IS ALIVE
  async CheckAPIHealth() {
    const response = await fetch(this.URL + "/");

    const json: APIRootResponse = await response.json();

    json;
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

    const response = await fetch(this.URL + "/check_user", {
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

  async GetLeaderboardScores() {
    return null;
  }
  async GetProfileData(username: string) {}
}

// fetch leaderboard scores
// fetch user's profile data
