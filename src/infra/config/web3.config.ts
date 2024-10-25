import { registerAs } from '@nestjs/config';
import { ConfigHelper } from './\bconfig-helper';

export interface Web3Config {
  privateKey: string;
  endpoint: string;
}

const key = 'web3.config';
export const web3Config = registerAs(
  key,
  (): Web3Config => ({
    privateKey:
      ConfigHelper.getEnvironmentVariableByPathOrFail('WEB3_PRIVATE_KEY'),
    endpoint: ConfigHelper.getEnvironmentVariableByPathOrFail('WEB3_ENDPOINT'),
  }),
);
