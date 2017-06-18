/**
 * Created by yjh on 17/06/16.
 */

'use strict';
const devConfig = require('./webpack.dev');
const proCinfig = require('./webpack.pro');
let result;

switch (process.env.NODE_ENV) {
    case "pro":
        result = proCinfig;
        break;
    case "dev":
        result = devConfig;
        break;
}

module.exports = result;