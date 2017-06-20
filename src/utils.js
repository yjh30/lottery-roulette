const isIphone = window.navigator.appVersion.match('iPhone');

/**
 * @function getRetinaValue 获取视网膜屏的相对值
 * @param {Number} value
 */
export function getRetinaValue(value) {
    return isIphone ? value * window.devicePixelRatio : value;
}

/**
 * @function toRadian 角度转换为弧度
 * @param {Number} degree 角度
 */
export function toRadian(degree) {
    return Math.PI / 180 * degree;
}

/**
 * @function initRetinaCanvasSize 初始化视网膜屏canvas大小
 * @param {DOM} canvas 
 */
export function initRetinaCanvasSize(canvas, width, height) {
    if (isIphone && window.devicePixelRatio > 1) {
        canvas.width = width * window.devicePixelRatio;
        canvas.height = height * window.devicePixelRatio;
    } else {
        canvas.width = width;
        canvas.height = height;
    }
}
