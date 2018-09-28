## 开发流程

1. 建立组件
    * /app/component/ 固定目录,所有业务组件在此目录下.
    * Index.jsx 模块输出 入口文件,固定写法,统一以Index命名
    * demo 模块目录,所有模块放在单独的文件夹下

2. 配置输出入口文件 config/entry/entry.js
   {
       name: 'demo',//将来生成html的名称
       path: 'demo/Index.jsx',//  app/component/下的 出口文件
       title: '案例',// html title名称
       keywords: '',// html keywords 预留
       description: ''//html description 预留
   }
   
3. 页面内链接地址获取
    统一引入 
    import {getUrl} from '../public/js/urlManager'
    getUrl(path, date); 
    path: html名称, 
    date: 可不传 传1 输出带时间戳的url地址
          类似 http://localhost:8000/service.html?1509097613847#/ShopService
