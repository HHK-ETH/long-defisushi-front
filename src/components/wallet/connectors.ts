import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: 'https://eth-mainnet.alchemyapi.io/v2/Y1q21D8WUrAEbkgvEIcnAv5V1R8DN6XL',
    4: 'https://eth-rinkeby.alchemyapi.io/v2/i_mPEFZnKMFp5715LvbJJzjsRc4eGFRl',
  },
  qrcode: true,
});

// todo: add multichain walletlink
export const walletlink = new WalletLinkConnector({
  url: 'https://eth-mainnet.alchemyapi.io/v2/Y1q21D8WUrAEbkgvEIcnAv5V1R8DN6XL',
  appName: 'Long DefiSushi',
});
