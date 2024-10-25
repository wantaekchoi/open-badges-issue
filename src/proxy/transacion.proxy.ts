export const TransactionProxySymbol = Symbol('TransactionProxy');

export interface TransactionProxy {
  execute<T>(operation: () => Promise<T>): Promise<T>;
}
