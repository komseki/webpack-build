
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


### **HtmlWebpackPlugin**
HtmlWebpackPlugin은 웹팩 번들을 제공하기 위해 HTML 파일 생성을 단순화합니다. 이는 컴파일 할 때마다 변경되는 파일 이름에 해시가 포함 된 webpack 번들에 특히 유용합니다. 플러그인에서 HTML 파일을 생성하거나, lodash 템플릿을 사용하여 템플릿을 제공하거나, 자체 로더를 사용할 수 있습니다.

#### **install**
``` javascript
npm install --save-dev html-webpack-plugin
```

#### **Basic Usage**

플러그인은 스크립트 태그를 사용하여 본문의 모든 webpack 번들을 포함하는 HTML5 파일을 생성합니다. 다음과 같이 webpack config에 플러그인을 추가하면됩니다.

``` javascript 
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var webpackConfig = {
  entry: 'index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index_bundle.js'
  },
  plugins: [new HtmlWebpackPlugin()]
};
```

그러면 dist / index.html 파일에 다음 내용이 포함됩니다.

``` javascript 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>webpack App</title>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```
웹팩 엔트리 포인트가 여러 개인 경우 생성 된 HTML에 스크립트 태그가 모두 포함됩니다.
webpack의 출력에 CSS 에셋이있는 경우 (예 : ExtractTextPlugin으로 추출한 CSS) HTML `<head>`에 `<link>` 태그와 함께 포함됩니다.

#### **Configuration**

* title: The title to use for the generated HTML document.
* filename: The file to write the HTML to. Defaults to index.html. You can specify a subdirectory here too (eg: assets/admin.html).
* template: Webpack require path to the template. Please see the docs for details.
* inject: true | 'head' | 'body' | false Inject all assets into the given template or templateContent - When passing true or 'body' all javascript resources will be placed at the bottom of the body element. 'head' will place the scripts in the head element.
* favicon: Adds the given favicon path to the output html.
* minify: {...} | false Pass html-minifier's options as object to minify the output.
* hash: true | false if true then append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting.
* cache: true | false if true (default) try to emit the file only if it was changed.
showErrors: true | false if true (default) errors details will be written into the HTML page.
* chunks: Allows you to add only some chunks (e.g. only the unit-test chunk)
* chunksSortMode: Allows to control how chunks should be sorted before they are included to the html. Allowed values: 'none' | 'auto' | 'dependency' |'manual' | {function} - default: 'auto'
* excludeChunks: Allows you to skip some chunks (e.g. don't add the unit-test chunk)
* xhtml: true | false If true render the link tags as self-closing, XHTML compliant. Default is false

다음은 이러한 옵션을 사용하는 방법을 보여주는 webpack 설정의 예입니다.

``` javascript
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: 'assets/admin.html'
    })
  ]
}
```

#### **Generating Multiple HTML Files**
두 개 이상의 HTML 파일을 생성하려면 플러그인 배열에서 플러그인을 두 번 이상 선언하십시오.
``` javascript
{
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin(), // Generates default index.html
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'test.html',
      template: 'src/assets/test.html'
    })
  ]
}
```
#### **Writing Your Own Templates**
생성 된 기본 HTML이 사용자의 요구 사항을 충족시키지 못하면 자신 만의 템플릿을 제공 할 수 있습니다. 가장 쉬운 방법은 템플릿 옵션을 사용하고 사용자 정의 HTML 파일을 전달하는 것입니다. html-webpack-plugin은 모든 CSS, JS, manifest 및 favicon 파일을 마크 업에 자동으로 주입합니다.

``` javascript
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template',
    template: 'my-index.html', // Load a custom template (lodash by default see the FAQ for details)
  })
]
```
`my-index.html:`

``` javascript
<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>
  <body>
  </body>
</html>
```
템플릿 로더가 이미있는 경우 템플릿 로더를 사용하여 템플릿을 구문 분석 할 수 있습니다. 이것은 웹팩 config파일에 html 로더를 지정하고 .html 파일을 템플릿으로 사용하는 경우에도 발생합니다
``` javascript
module: {
  loaders: [
    { test: /\.hbs$/, loader: "handlebars" }
  ]
},
plugins: [
  new HtmlWebpackPlugin({
    title: 'Custom template using Handlebars',
    template: 'my-index.hbs'
  })
]
```


#### **Events**
다른 플러그인이 HTML을 변경하도록 허용하기 위해이 플러그인은 다음 이벤트를 실행합니다.

Async:

* `html-webpack-plugin-before-html-generation`
* `html-webpack-plugin-before-html-processing`
* `html-webpack-plugin-alter-asset-tags`
* `html-webpack-plugin-after-html-processing`
* `html-webpack-plugin-after-emit`

Sync:

* `html-webpack-plugin-alter-chunks`

Example implementation: [html-webpack-harddisk-plugin](https://github.com/jantimon/html-webpack-harddisk-plugin)

Usage:
``` javascript
// MyPlugin.js

function MyPlugin(options) {
  // Configure your plugin with options...
}

MyPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      htmlPluginData.html += 'The magic footer';
      callback(null, htmlPluginData);
    });
  });

};

module.exports = MyPlugin;
```
webpack.config.js 에서 다음과 같이 설정한다.

``` javascript
plugins: [
  new MyPlugin({options: ''})
]
```
이 콜백은 동일한 html-webpack-plugin-before-html-processing 이벤트를 수신하는 다른 플러그인으로 전달하기 위해 htmlPluginData를 전달해야합니다.

[https://github.com/jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)
[https://webpack.js.org/plugins/html-webpack-plugin/](https://github.com/jantimon/html-webpack-plugin#html-webpack-plugin)


----------


### **Friendly-errors-webpack-plugin**