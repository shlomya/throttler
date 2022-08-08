"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenIssuer_1 = __importDefault(require("./TokenIssuer"));
function Throttler(options) {
    const tokenIssuer = new TokenIssuer_1.default(options.maxActive, options.duration);
    return function (target, propertyKey, descriptor) {
        console.log("target:", target);
        console.log("propertyKey:", propertyKey);
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args) {
            const token = await tokenIssuer.issue();
            const result = await originalMethod.apply(this, args);
            tokenIssuer.release(token);
            return result;
        };
        return descriptor;
    };
}
exports.default = Throttler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRUFBd0M7QUFPeEMsU0FBd0IsU0FBUyxDQUFDLE9BQWdCO0lBQ2hELE1BQU0sV0FBVyxHQUFHLElBQUkscUJBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUV4RSxPQUFPLFVBQ0wsTUFBVyxFQUNYLFdBQTRCLEVBQzVCLFVBQThCO1FBRTlCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXpDLE1BQU0sY0FBYyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDeEMsVUFBVSxDQUFDLEtBQUssR0FBRyxLQUFLLFdBQVcsR0FBRyxJQUFTO1lBQzdDLE1BQU0sS0FBSyxHQUFHLE1BQU0sV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEQsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzQixPQUFPLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7UUFDRixPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDLENBQUM7QUFDSixDQUFDO0FBcEJELDRCQW9CQyJ9