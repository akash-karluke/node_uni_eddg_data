import Axios from "axios";
import getAuthToken from "./getToken";

const interceptor = async (thunkApi: any) => {
  let token = await getAuthToken();
  // console.log({ token });
  let tokenInterval: any;

  tokenInterval = setInterval(async () => {
    if (!token) {
      token = await getAuthToken();
      // console.log({ token2: token });

      if (token) {
        clearInterval(tokenInterval);
        handleResponse(token, thunkApi);
      }
    }
  }, 2000);

  if (token) {
    clearInterval(tokenInterval);
    handleResponse(token, thunkApi);
  }

  setTimeout(() => {
    clearInterval(tokenInterval);
  }, 10000);
};
// const interceptor = {
//   interceptor,
// };
export default interceptor;

async function getLSToken() {
  // debugger;

  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accessToken")
      : "";
  return token;
}

function handleResponse(token: string, thunkApi: any) {
  // console.log("in handle reposnse");
  Axios.interceptors.request.use(
    (conf) => {
      conf.headers.Authorization = `Bearer ${token}`;
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  Axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      console.log("her?", error);
      if (error.response.status === 401) {
        console.log("Authorization error:", error.request.responseURL);
        window.location.reload();
        // }
        // thunkApi.dispatch(fetchUser(token));
      }
      if (error.message === "Network Error") {
        console.error("No Network or server down!");
      }

      return Promise.reject(error);
    }
  );
}
