import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { PublicClientApplication } from "@azure/msal-browser";
import {
  MsalProvider,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { MSAL_CONFIG } from "@/components/azure/config/authConfig";
import { Authentication } from "@/components/Authentication";
import { PageLayout } from "@/components/PageLayout";
import { Provider } from "react-redux";
import store from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

Spin.setDefaultIndicator(<LoadingOutlined />); // * For changing default loading Icon

const persistor = persistStore(store);
const msalInstance = new PublicClientApplication(MSAL_CONFIG);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<Spin />} persistor={persistor}>
        <MsalProvider instance={msalInstance}>
          <AuthenticatedTemplate>
            <PageLayout>
              <Component {...pageProps} />
              <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
            </PageLayout>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Authentication>
              <p>Please wait, Signing you in...</p>
            </Authentication>
          </UnauthenticatedTemplate>
        </MsalProvider>
      </PersistGate>
    </Provider>
  );
}
