import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { init, Web3OnboardProvider } from "@web3-onboard/react";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import injectedModule from "@web3-onboard/injected-wallets";
import trustModule from "@web3-onboard/trust";
import walletConnectModule from "@web3-onboard/walletconnect";

import { AppConfig, ChainConfig } from "./config/config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const injected = injectedModule();
const trust = trustModule();
const coinbaseWalletSdk = coinbaseWalletModule();
const walletConnect = walletConnectModule({
  projectId: "05c96d7b6183123d0d09d0b080843541",
  requiredChains: [ChainConfig.chainId],
  dappUrl: AppConfig.domain,
});

const wallets = [injected, trust, coinbaseWalletSdk, walletConnect];

const web3Onboard = init({
  chains: [
    {
      id: ChainConfig.chainIdHex,
      token: ChainConfig.chainSymbol,
      label: ChainConfig.chainName,
      rpcUrl: ChainConfig.providerList[0],
    },
  ],
  wallets,
  connect: { autoConnectLastWallet: true, autoConnectAllPreviousWallet: true },
  accountCenter: { desktop: { enabled: false }, mobile: { enabled: false } },
  theme: "dark",
  appMetadata: {
    name: AppConfig.title,
    description: AppConfig.title,
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <App />
      </Web3OnboardProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
