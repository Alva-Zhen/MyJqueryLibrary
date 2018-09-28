const fs = require("fs");
/*读取模版*/
let indexHtml = fs.readFileSync("doc/cssdoc/template.html", "utf-8");

/*读取公共ico*/
let common_ico = fs.readFileSync("app/public/css/common/common_ico.pcss", "utf-8");
let common_icoArray = common_ico.split('/*');
common_icoArray.splice(0, 1);
let re = new RegExp('../../img/', "g");
let common_ico_style = common_ico.replace(re, '../../app/public/img/');
let common_ico_resultData = '';
common_icoArray.map(data => {
    let className = data.substring(data.indexOf('.') + 1, data.indexOf(' {'));
    if (className.indexOf('.') !== -1) {
        let classNameNew = className.split('.');
        className = classNameNew[0] + ' ' + classNameNew[1]
    }
    let name = data.substring(0, data.indexOf('*/'));
    let source = data.substring(data.indexOf('*/') + 2, data.length);
    if (data.indexOf('background-image') !== -1) {
        common_ico_resultData += '<li>' +
            '<i class="' + className + '"></i>' +
            '<span class="none">' + name + '</span>' +
            '<pre class="none">' +
            source +
            '</pre>' +
            '</li>'
    }

});

/*读取主题*/
let common_theme = fs.readFileSync("app/public/css/common/common_theme.pcss", "utf-8");
let common_var = fs.readFileSync("app/public/css/common/common_var.pcss", "utf-8");
let themeColor = common_var.substring(common_var.indexOf('--theme-color: ') + 15, common_var.indexOf('--theme-color: ') + 15 + 7);
let themeBg = common_var.substring(common_var.indexOf('--theme-bg: ') + 12, common_var.indexOf('--theme-color: ') + 12 + 76);
common_theme = common_theme.replace(/var\(--theme-color\)/g, themeColor);
common_theme = common_theme.replace(/var\(--theme-bg\)/g, themeBg);

let common_themeArray = common_theme.split('/*');
common_themeArray.splice(0, 1);
let common_theme_resultData = '';
common_themeArray.map(data => {
    let className = data.substring(data.indexOf('.') + 1, data.indexOf(' {'));
    if (className.indexOf('.') !== -1) {
        let classNameNew = className.split('.');
        className = classNameNew[0] + ' ' + classNameNew[1]
    }
    let name = data.substring(0, data.indexOf('*/'));
    let source = data.substring(data.indexOf('*/') + 2, data.length);
    common_theme_resultData += '<li>' +
        '<i class="' + className + '">' + name + '</i>' +
        '<span class="none">' + name + '</span>' +
        '<pre class="none">' +
        source +
        '</pre>' +
        '</li>'

});


/*替换模版*/
let indexHtmlNew = indexHtml.replace('${common_ico_style}', common_ico_style).replace('{$common_ico}', common_ico_resultData).replace('${common_theme_style}', common_theme).replace('{$common_theme}', common_theme_resultData);

/*输出新页面*/
fs.writeFile("doc/cssdoc/index.html", indexHtmlNew, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }
});

