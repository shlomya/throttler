"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./index"));
class Demo {
    async run(ms) {
        return this.asyncAction(ms);
    }
    asyncAction(ms) {
        console.log("START asyncAction", ms);
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("END asyncAction", ms);
                resolve();
            }, ms);
        });
    }
}
__decorate([
    (0, index_1.default)({ duration: 1 * 1000, maxActive: 3 }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], Demo.prototype, "run", null);
const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
describe("Throttler Tests", () => {
    describe("Tests as a class method decorator", () => {
        beforeEach(() => {
            // jest.useFakeTimers();
        });
        it.only(`should activate an new caller when it's full`, (done) => {
            const demo = new Demo();
            const fn = jest.spyOn(demo, "asyncAction");
            demo.run(100).then(() => null);
            demo.run(300).then(() => null);
            demo.run(500).then(() => null);
            demo.run(200).then(() => null);
            process.nextTick(() => {
                expect(fn).toHaveBeenCalledTimes(3);
                done();
            });
        });
        it("should activate a waiting caller when the activates are less than the max active", async () => {
            const demo = new Demo();
            const fn = jest.spyOn(demo, "asyncAction");
            demo.run(100).then(() => null);
            demo.run(500).then(() => null);
            demo.run(500).then(() => null);
            demo.run(400).then(() => null);
            demo.run(400).then(() => null);
            await sleep(200);
            expect(fn).toHaveBeenCalledTimes(4);
        });
        it("should activate a waiting caller when the activates are less than the max active +2", async () => {
            const demo = new Demo();
            const fn = jest.spyOn(demo, "asyncAction");
            demo.run(100).then(() => null);
            demo.run(300).then(() => null);
            demo.run(500).then(() => null);
            demo.run(400).then(() => null);
            demo.run(400).then(() => null);
            await sleep(400);
            expect(fn).toHaveBeenCalledTimes(5);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmRleC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQWdDO0FBRWhDLE1BQU0sSUFBSTtJQUVSLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBVTtRQUNsQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVcsQ0FBQyxFQUFVO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzdCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbkMsT0FBTyxFQUFFLENBQUM7WUFDWixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWJDO0lBREMsSUFBQSxlQUFTLEVBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUM7Ozs7K0JBRy9DO0FBYUgsTUFBTSxLQUFLLEdBQUcsQ0FBQyxFQUFVLEVBQUUsRUFBRTtJQUMzQixPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDMUQsQ0FBQyxDQUFBO0FBRUQsUUFBUSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRTtJQUMvQixRQUFRLENBQUMsbUNBQW1DLEVBQUUsR0FBRyxFQUFFO1FBQ2pELFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCx3QkFBd0I7UUFDMUIsQ0FBQyxDQUFDLENB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