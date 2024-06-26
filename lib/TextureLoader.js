import PIXI from "pixi.js";
class TextureLoader {
    async load(src) {
        let texture = PIXI.utils.TextureCache[src];
        if (texture === undefined) {
            return new Promise((resolve) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                    img.onload = null;
                    if (PIXI.utils.TextureCache[src] !== undefined) {
                        texture = PIXI.utils.TextureCache[src];
                    }
                    else {
                        texture = PIXI.Texture.from(img);
                        PIXI.Texture.addToCache(texture, src);
                    }
                    resolve(texture);
                };
                img.src = src;
            });
        }
        else {
            return texture;
        }
    }
}
export default new TextureLoader();
//# sourceMappingURL=TextureLoader.js.map