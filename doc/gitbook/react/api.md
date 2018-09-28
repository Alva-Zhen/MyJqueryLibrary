# 接口请求

* 参考: http://localhost:8000/demo.html#/Api         前提执行:npm run dev
* source:app/component/dome/Api.jsx


## apiPost 详解
apiPost(apiName, data, successCb, errorCb)
<table>
    <tr>
        <td>参数名称</td>
        <td>类型</td>
        <td>参数说明</td>
        <td>可选</td>
    </tr>
    <tr>
        <td>apiName</td>
        <td>string</td>
        <td>接口URL</td>
        <td>FALSE</td>
    </tr>
    <tr>
        <td>data</td>
        <td>object</td>
        <td>接口传参 对象</td>
        <td>FALSE</td>
    </tr>
    <tr>
        <td>successCb</td>
        <td>fun</td>
        <td>成功回调</td>
        <td>FALSE</td>
    </tr>
    <tr>
        <td>errorCb</td>
        <td>fun</td>
        <td>失败回调</td>
        <td>TRUE</td>
    </tr>
</table>

```

import React from 'react';
import apiPost from '../../public/js/apiPost';

class Api extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:""
        };
    }
    postApi(){
        this.postApi = apiPost('banner_01',{},(data)=>{
            this.setState({data:data})
        },()=>{});
    }
    componentDidMount() {
        this.postApi();
    }
    componentWillUnmount(){
        this.postApi.abort(); /*组件卸载 停止ajax请求*/
    }
    render() {
        return (
            <div>
                接口请求 {this.state.data ? this.state.data.list[0].home_lbt.id : 0}
            </div>
        );
    }
}
export default Api;

```
