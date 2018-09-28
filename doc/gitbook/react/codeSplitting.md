# 组件

## 按需加载
详情见 component/demo
```
import {BundleFun} from '../common/Bundle';

import Layer from 'bundle-loader?lazy&name=demo-[name]!./Layer'; //demo 为当前html页面名称 ,此时[name] 为Layer
import ReduxDemo from 'bundle-loader?lazy&name=demo-redux!./redux/Index'; // 由于[name] 取的是Index名称,为避免冲突 可自定义名称

<Route path="/Layer" component={()=>BundleFun(Layer)}/>
<Route path="/reduxDemo" component={()=>BundleFun(ReduxDemo)}/>
```
