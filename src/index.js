import * as utils from './utils';

/**
 * @class LotteryRoulette 抽奖轮盘
 * created by yangjunhua on 17/06/16
 */

export default class LotteryRoulette {
    /**
     * @function 构造器
     * @param {Object} options 配置对象
     * @property {DOM} options.canvas 指定页面canvas元素
     * @property {Array} options.bgFillStyles 背景填充颜色
     * @property {Number} options.fontSize 字体大小
     * @property {Number} options.fontFamily 字体类型
     * @property {String} options.textAlign 文本水平对齐方式
     * @property {String} options.textBaseline 文本垂直对齐方式
     * @property {String} options.textFillStyle 字体填充颜色
     * @property {Number} options.textMarginTop 文本距离圆弧的距离
     * @property {Array} options.rewards 奖品
     */
    constructor(options) {
        this.init(options);
    }

    /**
     * @method init 初始化函数
     * @param {Object} options 配置对象
     */
    init(options) {
        this.canvas = options.canvas;
        this.context = this.canvas.getContext('2d');

        this.options = Object.assign({
            fontSize: 16,
            fontFamily: 'Microsoft YaHei',
            textBaseline: 'top',
            textAlign: 'center',
            textMarginTop: 0
        }, options || {});

        if (!this.options.canvasHeight) {
            this.options.canvasHeight = this.options.canvasWidth;
        }
        utils.initRetinaCanvasSize(this.canvas, this.options.canvasWidth, this.options.canvasHeight);

        this.rafId = null;
        this.lastMotionDegrees = 0;
        this.starting = false;

        this.initMotionDegrees = 270 - (360 / this.options.rewards.length / 2);
        this.drawCanvas(this.initMotionDegrees, this.drawRewardsByCanvas());
    }

    /**
     * @method run 开始转动轮盘
     * @param {Number} toIndex 转动到哪个奖品区域，从1开始
     * @param {Number} duration 轮盘转动的持续时间，单位：毫秒
     */
    run(toIndex, duration) {
        if (this.starting) return;
        this.starting = true;

        const degrees = this.initMotionDegrees + 360 - (toIndex - 1) * (360 / this.options.rewards.length);
        let detalDegrees = 0;
        let totalDegrees = degrees - this.lastMotionDegrees + 360 * 2;
        const motionStart = Date.now();

        const rafCallback = () => {
            const elapsed = Date.now() - motionStart;
            const t = (elapsed / duration) - 1;
            detalDegrees = totalDegrees * (1 - t * t * t * t);
            if (t > 0) {
                this.starting = false;
                this.lastMotionDegrees = degrees;
                this.options.callback && this.options.callback(this.lastMotionDegrees, totalDegrees);
                return;
            }
            this.drawCanvas(detalDegrees, this.drawRewardsByCanvas());
            this.rafId = window.requestAnimationFrame(rafCallback);
        };
        this.rafId = window.requestAnimationFrame(rafCallback);
    }

    /**
     * @method drawCanvas 绘制画布
     * @param {Number} degree 旋转角度
     * @param {DOM} cacheCanvas 离屏canvas
     */
    drawCanvas(degree, cacheCanvas) {
        const radian = utils.toRadian(degree + this.lastMotionDegrees);
        const radius = this.canvas.width / 2;

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.transform(Math.cos(radian), Math.sin(radian), -Math.sin(radian), Math.cos(radian), radius, radius);
        this.context.drawImage(cacheCanvas, 0, 0, this.canvas.width, this.canvas.height, -radius, -radius, this.canvas.width, this.canvas.height);
    }

    /**
     * @method stop 停止轮盘转动
     */
    stop() {
        window.cancelAnimationFrame(this.rafId);
    }

    drawRewardsByCanvas() {
        const options = this.options || {};
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        canvas.width = this.canvas.width;
        canvas.height = this.canvas.height;

        context.font = `${utils.getRetinaValue(options.fontSize)}px ${options.fontFamily}`;
        context.textBaseline = options.textBaseline;
        context.textAlign = options.textAlign;
        context.textMarginTop = options.textMarginTop;

        const length = options.rewards.length;
        const baseAngle = 360 / length;
        const radius = canvas.width / 2;
        let startAngle = 0;
        let endAngle = 0;

        for (let i = 0; i < length; i++) {
            startAngle = i * baseAngle;
            endAngle = (i + 1) * baseAngle;

            context.save();

            // 填充每块区域的背景色调 start ******************
            context.beginPath();
            context.arc(radius, radius, radius, utils.toRadian(startAngle), utils.toRadian(endAngle), false);
            context.arc(radius, radius, utils.getRetinaValue(0), utils.toRadian(endAngle), utils.toRadian(startAngle), true);
            context.closePath();

            const styleIndex = i % options.bgFillStyles.length;
            context.fillStyle = options.bgFillStyles[styleIndex];
            context.fill();
            // 画每块区域的背景色调 end ******************


            // 绘制奖品文字 start ******************
            context.beginPath();
            context.translate(radius, radius);

            const centerAngle = startAngle + baseAngle / 2;
            const translateX = Math.cos(utils.toRadian(centerAngle)) * (radius - utils.getRetinaValue(options.textMarginTop));
            const translateY = Math.sin(utils.toRadian(centerAngle)) * (radius - utils.getRetinaValue(options.textMarginTop));
            context.translate(translateX, translateY);
            context.rotate(utils.toRadian(centerAngle + 90));

            const texts = options.rewards[i];
            context.fillStyle = options.textFillStyle;
            for (let j = 0; j < texts.length; j++) {
                context.fillText(texts[j], 0, utils.getRetinaValue(20) * j);
            }
            // 绘制奖品文字 end ******************

            // 每次循环后恢复画布初始状态
            context.restore();
        }

        return canvas;
    }
}
