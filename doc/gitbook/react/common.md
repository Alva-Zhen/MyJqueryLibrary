# 公共组件

## 分页组件
引入 component/common/Page
```
 {
    state.totalNum > state.pageSize ?
        <Page totalNum={state.totalNum} pageSize={state.pageSize} start={state.start}
              onPageClick={this.onPageClick.bind(this)}/> : null
 }
```

## 默认图片组件
引入 component/common/DefaultImage
```$xslt
 <DefaultImage src={serviceInfoImg} alt={serviceInfo.serviceName} DefaultImageClassName="ico-default-user"/>
```


## 倒三角动画组件
引入 component/common/IcoArrow
```$xslt
 <IcoArrow show={Boolean} className="string"/>
 //className ico-search-arrow fr 空三角,ico-arrow-down fl 实三角
```

## 价格组件
引入 component/common/PriceFormat
```$xslt
  <PriceFormat data={{
      type:prepayType,
      min:minPrice,
      max:maxPrice,
      position:'detail'
  }}/>
```

## 弹窗/模态框:普通用法
```$xslt
 <LayerConfirm ref="ConfirmAnswerTypeShopDel" data={{
        title:'',
        content:'',
        button:{
            butOkText:'',
            butOkFun:this.ConfirmAnswerTypeShopDelCallBack.bind(this),
            closeAsync:true,//为true 将不自动关闭 请在回调方法里调用 组件show 方法关闭,不传 或为false 同步关闭
            butNoText:'',
            butNoFun:''
        }
    }}/>
```

## 弹窗/模态框:高阶用法
```$xslt
    import Answer from 'shop/demand/common/Answer';
    @LayerModalHOC('我要应答')
  
```
