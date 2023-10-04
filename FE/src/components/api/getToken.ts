import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import { MSAL_CONFIG } from "../azure/config/authConfig";

export default async function getAuthToken() {
  const msalInstance = new PublicClientApplication(MSAL_CONFIG);
  const accounts = msalInstance.getAllAccounts();
  // console.log("Accounts:", accounts);
  const accessTokenRequest = {
    scopes: ["user.read"],
    account: accounts[0],
  };

  try {
    const { accessToken } = await msalInstance.acquireTokenSilent(
      accessTokenRequest
    );
    // const  = response;
    return accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      msalInstance.acquireTokenRedirect(accessTokenRequest);
      console.log("Error in getting token", error);
    }
  }
}
