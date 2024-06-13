import { DomNode } from "@common-module/app";
import { autoDetectRenderer } from "pixi.js";
import Node from "../base/Node.js";
import Camera from "./Camera.js";
export default class Screen extends DomNode {
    width;
    height;
    root = new Node(0, 0);
    camera = new Camera(this.root);
    renderer;
    animationInterval;
    beforeTime = 0;
    ratio = 1;
    constructor(width, height, ...nodes) {
        super();
        this.width = width;
        this.height = height;
        this.root.screen = this;
        this.root.append(...nodes);
        this.createRenderer();
        this.resume();
    }
    resize(width, height, ratio) {
        this.width = width;
        this.height = height;
        this.ratio = ratio;
        if (this.renderer) {
            this.renderer.resize(this.width, this.height);
            this.renderer.canvas.width = this.width;
            this.renderer.canvas.height = this.height;
            this.renderer.canvas.style.width = `${this.width * this.ratio}px`;
            this.renderer.canvas.style.height = `${this.height * this.ratio}px`;
        }
        this.root.setPosition(this.width / 2, this.height / 2);
    }
    async createRenderer() {
        this.renderer = await autoDetectRenderer({
            width: this.width,
            height: this.height,
        });
        this.resize(this.width, this.height, this.ratio);
        this.domElement.appendChild(this.renderer.canvas);
    }
    step(deltaTime) {
        this.root.step(deltaTime);
        this.renderer?.render(this.root.container);
    }
    tic = (now) => {
        const deltaTime = (now - this.beforeTime) / 1000;
        if (deltaTime > 0) {
            this.step(deltaTime);
            this.beforeTime = now;
        }
        this.animationInterval = requestAnimationFrame(this.tic);
    };
    resume() {
        if (!this.animationInterval) {
            this.beforeTime = performance.now();
            this.animationInterval = requestAnimationFrame(this.tic);
        }
    }
}
//# sourceMappingURL=Screen.js.map