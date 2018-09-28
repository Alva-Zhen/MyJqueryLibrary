## 安装说明

``` bash

$ npm i                     安装所有依赖

$ npm run devNew            是第一次运行或者有新的页面或者的时候 先执行该命令 再执行 npm run dev

$ npm run dev               开发:同时执行下面两个命令 http://localhost:8000/ 
                            端口在 webpack.dev.conf.js  修改
                            示列:http://localhost:8000/demo.html
                            
$ npm run devBuild          开发:生成HTML      忽略
$ npm run devServer         开发:开启热替换    忽略

$ npm run p                 生产:打包
$ npm run pt                生产:打包 , 同时发布到远程 test 上
$ npm run ptht              生产:打包 , 同时发布到远程 test,hera,线上test上

```


