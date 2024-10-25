import { NotDefinedException } from 'src/exception';
export class ConfigHelper {
  static getEnvironmentVariableByPathOrFail(path: string): string {
    const value = process.env[path];
    if (!value) {
      NotDefinedException.throw(`environment variable ${path}`);
    }
    return value;
  }

  static getEnvironmentVariableByPathOrDefault(
    path: string,
    fallback: string,
  ): string {
    return process.env[path] ?? fallback;
  }
}
