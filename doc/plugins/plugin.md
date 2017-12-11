
### **DefinePlugin**
DefinePlugin을 사용하면 컴파일 타임에 구성 할 수있는 전역 상수를 만들 수 있습니다. 이는 개발 빌드와 릴리스 빌드간에 서로 다른 동작을 허용 할 때 유용 할 수 있습니다. 개발 빌드에서는 로깅을 수행하지만 릴리스 빌드에서는 로깅을 수행하지 않으면 로깅의 발생 여부를 결정하기 위해 전역 상수를 사용할 수 있습니다.

``` javascript
new webpack.DefinePlugin({
  // Definitions...
})
```
[https://webpack.js.org/plugins/define-plugin/](https://webpack.js.org/plugins/define-plugin/)


----------


### **NoEmitOnErrorsPlugin**
컴파일하는 동안 오류가 발생할 때마다 NoEmitOnErrorsPlugin을 사용하여 emitting 단계를 건너 뜁니다. 이렇게하면 오류가 포함 된 애셋이 생성되지 않습니다. stats에서 `emitted` 플래그는 모든 에셋에 대해 `false`입니다.

``` javascript
new webpack.NoEmitOnErrorsPlugin()
```
[https://webpack.js.org/plugins/no-emit-on-errors-plugin/](https://webpack.js.org/plugins/no-emit-on-errors-plugin/)


----------


### **HotModuleReplacementPlugin**
HMR로 알려진 Hot Module Replacement를 활성화 시킵니다.
HMR을 사용하는 것은 쉽고 대부분의 경우 옵션이 필요하지 않습니다.

``` javascript
new webpack.HotModuleReplacementPlugin({
  // Options...
})
```
[https://webpack.js.org/plugins/hot-module-replacement-plugin/](https://webpack.js.org/plugins/hot-module-replacement-plugin/)


----------



### **Friendly-errors-webpack-plugin**

Friendly-errors-webpack-plugin은 특정 클래스의 webpack 오류를 인식하고 더 나은 개발자 경험을 제공하기 위해 이를 정리하고 집계하며 우선 순위를 지정합니다.

[https://www.npmjs.com/package/friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin)