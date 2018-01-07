const {injectBabelPlugin} = require('react-app-rewired');
module.exports = function override(config, env) {
    onfig = injectBabelPlugin(['import', {libraryName: 'antd-mobile', style: 'css'}], config);
    return config;
};