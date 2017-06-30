/**
 * @function getRetinaValue 获取视网膜屏的相对值
 * @param {Number} value
 */
export function getRetinaValue(value) {
    if (window.devicePixelRatio > 2) {
    	return value * parseInt(window.devicePixelRatio, 10);
    } else {
    	return value;
    }
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
    if (window.devicePixelRatio > 2) {
        canvas.width = width * parseInt(window.devicePixelRatio, 10);
        canvas.height = height * parseInt(window.devicePixelRatio, 10);
    } else {
        canvas.width = width;
        canvas.height = height;
    }
}
