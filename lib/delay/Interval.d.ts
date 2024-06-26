import Entity from "../base/Entity.js";
export default class Interval extends Entity {
    private ms;
    private onInterval;
    private elapsedTime;
    constructor(ms: number, onInterval: () => void);
    protected update(deltaTime: number): void;
}
//# sourceMappingURL=Interval.d.ts.map