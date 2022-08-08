declare type Options = {
    maxActive: number;
    duration: number;
};
export default function Throttler(options: Options): (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => PropertyDescriptor;
export {};
