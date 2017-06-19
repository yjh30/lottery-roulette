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

/**
 * @function getRetinaFontSize 获取视网膜屏的字体大小
 * @param {Number} fontSize 字体大小
 */
const isIphone = window.navigator.appVersion.match('iPhone');
function getRetinaValue(value) {
    return isIphone ? value * window.devicePixelRatio : value;
}

/**
 * @function initRetinaCanvasSize 初始化视网膜屏canvas大小
 * @param {DOM} canvas 
 */
function initRetinaCanvasSize(canvas) {
    if (isIphone && window.devicePixelRatio > 1) {
        canvas.width = 360 * window.devicePixelRatio;
        canvas.height = 360 * window.devicePixelRatio;
    } else {
        canvas.width = 360;
        canvas.height = 360;
    }
}

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
initRetinaCanvasSize(canvas);

context.fillStyle = 'red';
context.font = `${getRetinaValue(16)}px Microsoft YaHei`;
context.textBaseline = 'top';

let startAngle = 0;
let endAngle = 0;
const length = 6;
const baseAngle = 360 / 6;
const radianPerAngle = Math.PI / 180;
const radius = canvas.width / 2;

for (let i = 0; i < length; i++) {
    startAngle = i * baseAngle;
    endAngle = (i + 1) * baseAngle;

    context.save();
    context.beginPath();
    context.arc(radius, radius, radius, startAngle * radianPerAngle, endAngle * radianPerAngle, false);
    context.arc(radius, radius, getRetinaValue(30), endAngle * radianPerAngle, startAngle * radianPerAngle, true);
    context.closePath();

    if (i % 2 === 0) {
        context.fillStyle = '#ffdf3e';
    } else {
        context.fillStyle = '#fabe00';
    }
    context.fill();

    context.beginPath();
    context.translate(radius, radius);

    const dd = startAngle + baseAngle / 2;
    const translateX = Math.cos(dd * radianPerAngle) * Math.cos(baseAngle / 2 * radianPerAngle) * radius * 3/4;
    const translateY = Math.sin(dd * radianPerAngle) * Math.cos(baseAngle / 2 * radianPerAngle) * radius * 3/4 ;

    context.translate(translateX, translateY);
    context.textBaseline = 'top';
    switch (i) {
        case 0:
            context.rotate(120 * radianPerAngle);
            context.textBaseline = 'bottom';
            break;
        case 1:
            // ...
            context.rotate(0 * radianPerAngle);
            break;
        case 2:
            context.rotate(60 * radianPerAngle);
            break;
        case 3:
            context.rotate(120 * radianPerAngle);
            break;
        case 4:
            // ...
            context.textBaseline = 'bottom';
            context.rotate(0 * radianPerAngle);
            break;
        case 5:
            context.textBaseline = 'bottom';
            context.rotate(60 * radianPerAngle);
            break;
    }

    context.textAlign = 'center';
    context.fillStyle = 'green';
    context.fillText(`${i+1}00元`, 0, 0);

    if (i === 0) {
        context.fillText(`${i+1}00元哦`, 0, getRetinaValue(20));
    }

    context.restore();
}