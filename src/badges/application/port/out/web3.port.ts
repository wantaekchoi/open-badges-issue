import { TransactionReceipt } from 'web3';

export const Web3PortSymbol = Symbol('Web3Port');

export interface Web3Port {
  send(params: {
    to: string;
    value: string | number;
    gas?: number;
    data?: string;
  }): Promise<TransactionReceipt>;

  getChainId(): Promise<number>;

  getAddress(): string;

  getBurnAdress(): string;
}

export { TransactionReceipt };
