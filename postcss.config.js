const px2rem = require('postcss-px2rem');

module.exports = {
    plugins: [
        require('autoprefixer'),
        px2rem({
            baseDpr: 2,
            remUnit: 75,
            forcePxComment: '!px',
            keepComment: '!no'
        })
    ]
};
