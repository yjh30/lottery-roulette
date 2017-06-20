// import LotteryRoulette from './index';

// const lotteryRoulette = new LotteryRoulette({
//     img: document.querySelector('.prizes')
// });
// const btns = document.querySelectorAll('button');


// let delta = 0;
// [].forEach.call(btns, (btn, i) => {
//     btn.addEventListener('click', () => {
//         const deg = 360 - (i + 1 + i) * 30;
//         // console.log(deg);
//         lotteryRoulette.run(deg, 3000);
//     });
// });

import './example.scss';
import * as utils from './utils';

const canvas = document.querySelector('canvas');

// 必须先初始化大小，否则将会影响字体
utils.initRetinaCanvasSize(canvas, 360, 360);

const context = canvas.getContext('2d');
context.font = `${utils.getRetinaValue(16)}px Microsoft YaHei`;
context.textBaseline = 'top';

const length = 6;
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
    context.arc(radius, radius, utils.getRetinaValue(30), utils.toRadian(endAngle), utils.toRadian(startAngle), true);
    context.closePath();

    if (i % 2 === 0) {
        context.fillStyle = '#ffdf3e';
    } else {
        context.fillStyle = '#fabe00';
    }
    context.fill();
    // 画每块区域的背景色调 end ******************


    // 绘制奖品文字 start ******************
    context.beginPath();
    context.translate(radius, radius);

    const centerAngle = startAngle + baseAngle / 2;
    const translateX = Math.cos(utils.toRadian(centerAngle)) * Math.cos(utils.toRadian(baseAngle / 2)) * radius * 3/4;
    const translateY = Math.sin(utils.toRadian(centerAngle)) * Math.cos(utils.toRadian(baseAngle / 2)) * radius * 3/4 ;
    context.translate(translateX, translateY);
    context.textBaseline = 'top';

    context.rotate(utils.toRadian(centerAngle + 90));
    context.textAlign = 'center';
    context.fillStyle = 'green';
    context.fillText(`${i+1}00元`, 0, 0);

    if (i === 0) {
        context.fillText(`${i+1}00元哦`, 0, utils.getRetinaValue(20));
    }
    // 绘制奖品文字 end ******************

    // 每次循环后恢复画布初始状态
    context.restore();
}