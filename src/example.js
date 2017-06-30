import './example.scss';
import LotteryRoulette from './index';

const lotteryRoulette = new LotteryRoulette({
    canvas: document.querySelector('canvas'),
    canvasWidth: 360,
    bgFillStyles: ['#ffdf3e', '#fabe00'],
    fontSize: 16,
    textFillStyle: 'green',
    textMarginTop: 50,
    rewards: [
        ['奖品1', '奖品1+'],
        ['奖品2'],
        ['奖品3'],
        ['奖品4'],
        ['奖品5'],
        ['奖品6'],
        // ['奖品7'],
        // ['奖品8'],
        // ['奖品9'],
        // ['奖品10'],
    ]
});


document.querySelector('.btn1').addEventListener('click', function(e) {
    lotteryRoulette.run(1, 5000);
});
document.querySelector('.btn2').addEventListener('click', function(e) {
    lotteryRoulette.run(2, 5000);
});
document.querySelector('.btn3').addEventListener('click', function(e) {
    lotteryRoulette.run(3, 5000);
});
document.querySelector('.btn4').addEventListener('click', function(e) {
    lotteryRoulette.run(4, 5000);
});
document.querySelector('.btn5').addEventListener('click', function(e) {
    lotteryRoulette.run(5, 5000);
});
document.querySelector('.btn6').addEventListener('click', function(e) {
    lotteryRoulette.run(6, 5000);
});

