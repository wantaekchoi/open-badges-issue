import { Logger } from '@nestjs/common';
import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';

export class TypeOrmLoggerProvider implements TypeOrmLogger {
  private readonly logger: Logger = new Logger(TypeOrmLoggerProvider.name);

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const runnerId = queryRunner
      ? queryRunner.connection.driver.database
      : 'N/A';
    this.logger.log(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)} -- QueryRunner ID: ${runnerId}`,
    );
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    const runnerId = queryRunner
      ? queryRunner.connection.driver.database
      : 'N/A';
    this.logger.error(
      `${query} -- Parameters: ${this.stringifyParameters(parameters)} -- QueryRunner ID: ${runnerId} -- ${error}`,
    );
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner,
  ) {
    const runnerId = queryRunner
      ? queryRunner.connection.driver.database
      : 'N/A';
    this.logger.warn(
      `Time: ${time}ms -- ${query} -- Parameters: ${this.stringifyParameters(parameters)} -- QueryRunner ID: ${runnerId}`,
    );
  }

  logMigration(message: string, queryRunner?: QueryRunner) {
    const runnerId = queryRunner
      ? queryRunner.connection.driver.database
      : 'N/A';
    this.logger.log(`Migration: ${message} -- QueryRunner ID: ${runnerId}`);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    const runnerId = queryRunner
      ? queryRunner.connection.driver.database
      : 'N/A';
    this.logger.log(`Schema Build: ${message} -- QueryRunner ID: ${runnerId}`);
  }

  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner) {
    const runnerId = queryRunner
      ? queryRunner.connection.driver.database
      : 'N/A';
    switch (level) {
      case 'log':
        this.logger.log(`${message} -- QueryRunner ID: ${runnerId}`);
        break;
      case 'info':
        this.logger.debug(`${message} -- QueryRunner ID: ${runnerId}`);
        break;
      case 'warn':
        this.logger.warn(`${message} -- QueryRunner ID: ${runnerId}`);
        break;
    }
  }

  private stringifyParameters(parameters?: any[]) {
    return parameters?.length ? JSON.stringify(parameters) : '';
  }
}
