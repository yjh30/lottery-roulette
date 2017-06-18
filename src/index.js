/**
 * @class LotteryRoulette 抽奖轮盘
 * created by yangjunhua on 17/06/16
 */

export default class LotteryRoulette {
    constructor(options) {
        this.init(options);
    }

    /**
     * @method init 初始化函数
     * @param {Object} options 配置对象
     */
    init(options) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.img = {};

        this.rafId = null;
        this.lastMotionDegrees = 0;
        this.starting = false;
        this.callback = options.callback || function() {};

        const imgLoadedHandler = () => {
            this.imgLoaded = true;

            this.saveImgSize(options.img);
            this.img.el = options.img;
            this.canvas.width = this.img.width;
            this.canvas.height = this.img.height;
            this.drawImg(0);

            options.img.parentNode.insertBefore(this.canvas, options.img);
            options.img.parentNode.removeChild(options.img);
        };

        if (options.img.complete) {
            imgLoadedHandler();
        } else {
            options.img.onload = imgLoadedHandler;
        }
    }

    /**
     * @method saveImgSize 保存图片大小
     * @param {Element} img
     */
    saveImgSize(img) {
        const styleObj = window.getComputedStyle(img);
        this.img.width = parseInt(styleObj.getPropertyValue('width'), 10);
        this.img.height = parseInt(styleObj.getPropertyValue('height'), 10);
        this.img.naturalWidth = img.naturalWidth;
        this.img.naturalHeight = img.naturalHeight;
    }

    /**
     * @method drawImg 绘图
     * @param {Number} degree 旋转角度
     */
    drawImg(degree) {
        const radian = Math.PI / 180 * (degree + this.lastMotionDegrees);

        this.context.clearRect(0, 0, this.img.width, this.img.height);
        this.context.beginPath();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.transform(Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian), this.img.width / 2, this.img.height / 2);
        this.context.drawImage(this.img.el, 0, 0, this.img.naturalWidth, this.img.naturalHeight, -this.img.width / 2, -this.img.height / 2, this.img.width, this.img.height);
    }

    /**
     * @method run 开始转动轮盘
     * @param {Number} radians 需要转动多少角度，如：720deg
     * @param {Number} duration 轮盘转动的持续时间，单位：毫秒
     */
    run(degrees, duration) {
        if (!this.imgLoaded) return;
        if (this.starting) return;
        this.starting = true;

        let detalDegrees = 0;
        let totalDegrees = degrees - this.lastMotionDegrees + 360 * 4;
        const motionStart = Date.now();

        const rafCallback = () => {
            const elapsed = Date.now() - motionStart;
            const t = (elapsed / duration) - 1;
            detalDegrees = totalDegrees * (1 - t * t * t * t);
            if (t > 0) {
                this.starting = false;
                this.lastMotionDegrees = degrees;
                this.callback(this.lastMotionDegrees, totalDegrees);
                return;
            }
            this.drawImg(detalDegrees);
            this.rafId = window.requestAnimationFrame(rafCallback);
        };
        this.rafId = window.requestAnimationFrame(rafCallback);
    }

    /**
     * @method stop 停止轮盘转动
     */
    stop() {
        if (!this.imgLoaded) return;
        window.cancelAnimationFrame(this.rafId);
    }
}