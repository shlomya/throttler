export default class TokenIssuer {
    private maxActive;
    private duration;
    private counter;
    private actives;
    constructor(maxActive: number, duration: number);
    private sleep;
    issue(): Promise<number>;
    release(token: number): void;
}
