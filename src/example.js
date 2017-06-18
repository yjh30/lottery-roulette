import LotteryRoulette from './index';

const lotteryRoulette = new LotteryRoulette({
    img: document.querySelector('.prizes')
});
const btns = document.querySelectorAll('button');


let delta = 0;
[].forEach.call(btns, (btn, i) => {
    btn.addEventListener('click', () => {
        const deg = 360 - (i + 1 + i) * 30;
        // console.log(deg);
        lotteryRoulette.run(deg, 3000);
    });
});