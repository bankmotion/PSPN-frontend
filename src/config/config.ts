import { SwapTokenType } from "../interfaces/SwapTokenType";

export const ChainConfig = {
  chainSymbolFull: "Pulse",
  chainSymbol: "PLS",
  chainName: "PulseChain",
  chainId: 369,
  chainIdHex: 0x171,
  blockTime: 3000,
  providerList: ["https://rpc.pulsechain.com"],
  explorerUrl: "https://otter.pulsechain.com/",
};

export const AppConfig = {
  title: "PSPN",
  domain: "pulsemafia.io",
};

export const ContractConfig = {
  TokenAddress: "0x44aA9448c8899EB6b3d47EE61a7149677aa7fd6e",
  UFCAddress: "0xD22CE8CaD2aD59EF1d9DF4DDED9567F0F9e2B554",
  InternalSwapAddress: "0x710da6bAB9d956b45043d63FD76537F5447331D3",
  UFCBetAddress: "0x1e4591f04F6B26D1d52066653e92522060761f6c",
};

export const SwapTokens: SwapTokenType[] = [
  {
    name: "PSPN",
    address: ContractConfig.TokenAddress,
    logo: "pspn.png",
  },
  {
    name: "UFC",
    address: ContractConfig.UFCAddress,
    logo: "ufc.png",
  },
];
