import { Logger } from '@nestjs/common';

export const Trace =
  (): MethodDecorator =>
  (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor => {
    const originalMethod = descriptor.value;
    const className = target.constructor.name;

    descriptor.value = async function (...args: any[]) {
      Logger.debug(
        `Calling ${className}.${propertyKey}(${JSON.stringify(args)})`,
        'Trace',
      );

      const result = await originalMethod.apply(this, args);
      Logger.debug(
        `${className}.${propertyKey} returned: ${JSON.stringify(result)}`,
        'Trace',
      );

      return result;
    };
    return descriptor;
  };
