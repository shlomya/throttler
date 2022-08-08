export default class TokenIssuer {
  private counter = 0;
  private actives = new Map();

  constructor(private maxActive: number, private duration: number) {}

  private sleep (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  public async issue(): Promise<number> {
    if (this.actives.size < this.maxActive) {
      const token = this.counter++;
      this.actives.set(token, new Date());
      return token;
    } else {
      const oldest = [...this.actives.values()].shift();
      const waitFor = oldest + this.duration - new Date().getTime();
      await this.sleep(waitFor)
      return this.issue()
    }
  }
  public release(token: number) {
    this.actives.delete(token);
  }
}