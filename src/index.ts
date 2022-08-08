import TokenIssuer from './TokenIssuer';

type Options = {
  maxActive: number;
  duration: number; // Max active per {duration}
};

export default function Throttler(options: Options) {
  const tokenIssuer = new TokenIssuer(options.maxActive, options.duration)

  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    console.log("target:", target);
    console.log("propertyKey:", propertyKey);

    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any) {
      const token = await tokenIssuer.issue();
      const result = await originalMethod.apply(this, args);
      tokenIssuer.release(token);
      return result;
    };
    return descriptor;
  };
}
