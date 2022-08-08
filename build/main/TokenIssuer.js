"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TokenIssuer {
    constructor(maxActive, duration) {
        this.maxActive = maxActive;
        this.duration = duration;
        this.counter = 0;
        this.actives = new Map();
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async issue() {
        if (this.actives.size < this.maxActive) {
            const token = this.counter++;
            this.actives.set(token, new Date());
            return token;
        }
        else {
            const oldest = [...this.actives.values()].shift();
            const waitFor = oldest + this.duration - new Date().getTime();
            await this.sleep(waitFor);
            return this.issue();
        }
    }
    release(token) {
        this.actives.delete(token);
    }
}
exports.default = TokenIssuer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9rZW5Jc3N1ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvVG9rZW5Jc3N1ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFxQixXQUFXO0lBSTlCLFlBQW9CLFNBQWlCLEVBQVUsUUFBZ0I7UUFBM0MsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVE7UUFIdkQsWUFBTyxHQUFHLENBQUMsQ0FBQztRQUNaLFlBQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBRXNDLENBQUM7SUFFM0QsS0FBSyxDQUFFLEVBQVU7UUFDdkIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUN4RCxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDaEIsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7YUFBTTtZQUNMLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbEQsTUFBTSxPQUFPLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM5RCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDekIsT0FBTyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7U0FDcEI7SUFDSCxDQUFDO0lBQ00sT0FBTyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBekJELDhCQXlCQyJ9