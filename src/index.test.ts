import Throttler from "./index";

class Demo {
  @Throttler({ duration: 1 * 1000, maxActive: 3 })
  async run(ms: number) {
    return this.asyncAction(ms);
  }

  asyncAction(ms: number): Promise<void> {
    console.log("START asyncAction", ms);
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("END asyncAction", ms);
        resolve();
      }, ms);
    });
  }
}

const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

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
      })
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
