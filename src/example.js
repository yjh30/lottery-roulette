import './example.scss';
import * as utils from './utils';

/**
 * @function drawRewardsByCanvas 通过canvas来绘制奖品
 * @param {Object} options 配置对象
 * @property {Object} options.canvasWidth 画布宽
 * @property {Number} options.canvasHeight 画布高
 * @property {Array} options.bgFillStyles 背景填充颜色
 * @property {Number} options.fontSize 字体大小
 * @property {Number} options.fontFamily 字体类型
 * @property {String} options.textAlign 文本水平对齐方式
 * @property {String} options.textBaseline 文本垂直对齐方式
 * @property {String} options.textFillStyle 字体填充颜色
 * @property {Number} options.textMarginTop 文本距离圆弧的距离
 * @property {Array} options.rewards 奖品
 */

function drawRewardsByCanvas(canvas, options = {}) {
    options = Object.assign({
        fontSize: 16,
        fontFamily: 'Microsoft YaHei',
        textBaseline: 'top',
        textAlign: 'center',
        textMarginTop: 0
    }, options);

    if (!options.canvasHeight) {
        options.canvasHeight = options.canvasWidth;
    }

    // 必须先初始化大小，否则将会影响字体
    utils.initRetinaCanvasSize(canvas, options.canvasWidth, options.canvasHeight);

    const context = canvas.getContext('2d');
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
}

drawRewardsByCanvas(document.querySelector('canvas'), {
    canvasWidth: 360,
    bgFillStyles: ['#ffdf3e', '#fabe00'],
    fontSize: 16,
    textFillStyle: 'green',
    textMarginTop: 50,
    rewards: [
        ['100元', '100元+'],
        ['200元'],
        ['300元'],
        ['400元'],
        ['500元'],
        ['600元'],
        ['700元'],
        ['800元'],
        // ['900元'],
        // ['1000元'],
    ]
});
