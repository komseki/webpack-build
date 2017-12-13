## Output Management ##

이 가이드는 [`Asset Management`](https://webpack.js.org/guides/asset-management/) 가이드에있는 코드 예제를 확장합니다.

### Preparation ###
기존 프로젝트를 수정합니다.

**project**
```log
  |- package.json
  |- webpack.config.js
  |- /dist
  |- /src
    |- index.js
+   |- print.js
  |- /node_modules
```

`src/print.js` 파일에 몇 가지 로직을 추가해 보겠습니다.

**src/print.js**
```javascript
export default function printMe() {
  console.log('I get called from print.js!');
}
```
`src/index.js` 파일에서 추가한 함수를 사용합니다 :

**src/index.js**
```javascript
  import _ from 'lodash';
+ import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
+   var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

+   btn.innerHTML = 'Click me and check the console!';
+   btn.onclick = printMe;
+
+   element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
```

엔트리가 여러개인 webpack에 대응하기위해 `dist/index.html` 파일도 업데이트 해 보겠습니다.

**dist/index.html**
```html
  <html>
    <head>
-     <title>Asset Management</title>
+     <title>Output Management</title>
+     <script src="./print.bundle.js"></script>
    </head>
    <body>
-     <script src="./bundle.js"></script>
+     <script src="./app.bundle.js"></script>
    </body>
  </html>
```

config를 수정합니다 
`src/print.js`를 새로운 엔트리 포인트 (print)로 추가 합니다
output 속성을 변경하여 엔트리 포인트 이름을 이용해 파일 명을 동적 생성합니다.

**webpack.config.js**

```javascript
  const path = require('path');

  module.exports = {
    entry: {
-     index: './src/index.js',
+     app: './src/index.js',
+     print: './src/print.js'
    },
    output: {
-     filename: 'bundle.js',
+     filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

`npm run build`를 실행하고 생성된 것을 확인합니다.

```log
Hash: aa305b0f3373c63c9051
Version: webpack 3.0.0
Time: 536ms
          Asset     Size  Chunks                    Chunk Names
  app.bundle.js   545 kB    0, 1  [emitted]  [big]  app
print.bundle.js  2.74 kB       1  [emitted]         print
   [0] ./src/print.js 84 bytes {0} {1} [built]
   [1] ./src/index.js 403 bytes {0} [built]
   [3] (webpack)/buildin/global.js 509 bytes {0} [built]
   [4] (webpack)/buildin/module.js 517 bytes {0} [built]
    + 1 hidden module
```

webpack은 index.html 파일에 entry 속성에서 지정한 `print.bundle.js` 및 `app.bundle.js` 파일을 생성합니다.
브라우저에서 index.html을 열어 버튼을 클릭하면 어떻게되는지 알 수 있습니다.

그러나 우리가 엔트리 포인트 중 하나의 이름을 변경하거나 새로운 것을 추가했다면 어떻게 될 것입니까?
생성 된 번들은 빌드시 이름이 변경되지만 index.html 파일은 여전히 ​​이전 이름을 참조합니다.
[HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)으로 이 문제를 해결해 보겠습니다.

### Setting up HtmlWebpackPlugin ###

먼저 플러그인을 설치하고 webpack.config.js 파일을 수정합니다.
```log
npm install --save-dev html-webpack-plugin
```
**webpack.config.js**
```javascript
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

HtmlWebpackPlugin은 `dist/` 폴더에 있는 `index.html`을 새로 생성해 대체 합니다 아래는 `npm run build` 명령을 실행했을 때 로그입니다. 


```log
Hash: 81f82697c19b5f49aebd
Version: webpack 2.6.1
Time: 854ms
           Asset       Size  Chunks                    Chunk Names
 print.bundle.js     544 kB       0  [emitted]  [big]  print
   app.bundle.js    2.81 kB       1  [emitted]         app
      index.html  249 bytes          [emitted]
   [0] ./~/lodash/lodash.js 540 kB {0} [built]
   [1] (webpack)/buildin/global.js 509 bytes {0} [built]
   [2] (webpack)/buildin/module.js 517 bytes {0} [built]
   [3] ./src/index.js 172 bytes {1} [built]
   [4] multi lodash 28 bytes {0} [built]
Child html-webpack-plugin for "index.html":
       [0] ./~/lodash/lodash.js 540 kB {0} [built]
       [1] ./~/html-webpack-plugin/lib/loader.js!./~/html-webpack-plugin/default_index.ejs 538 bytes {0} [built]
       [2] (webpack)/buildin/global.js 509 bytes {0} [built]
       [3] (webpack)/buildin/module.js 517 bytes {0} [built]
```

코드 편집기에서 index.html을 열면 HtmlWebpackPlugin이 완전히 새로운 파일을 만들고 모든 번들이 자동으로 추가된다는 것을 알 수 있습니다.
<br /><br />
HtmlWebpackPlugin이 제공하는 모든 기능과 옵션에 대해 자세히 알고 싶다면 [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) 저장소를 참고하세요.
<br /><br />
또한 기본 템플릿 외에도 몇 가지 추가 기능을 제공하는 [html-webpack-template](https://github.com/jaketrent/html-webpack-template)을 살펴볼 수 있습니다.

### Cleaning up the /dist folder ###

이전 가이드와 코드 예제를 통해 `/dist` 폴더가 복잡해졌습니다. 
Webpack은 파일을 생성하여 `/dist` 폴더에 저장하지만 프로젝트에서 실제로 사용중인 파일만 추적하지 않습니다.
<br /><br />
일반적으로 각 빌드 전에 `/dist` 폴더를 정리하여 사용 된 파일 만 생성되도록하는 것이 좋습니다.
<br /><br />
이러한 빌드 파일을 관리하는 인기있는 플러그인은 [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin)입니다. 설치후 config 파일을 통해 설정을 추가합니다.
```log
npm install clean-webpack-plugin --save-dev
```
**webpack.config.js**
```javascript
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```
`npm run build` 명령을 실행하고 `/dist` 폴더를 확인하십시오 
정상적으로 작동했다면, 빌드시 생성한 파일과 최근에 만들어진 파일만 남아있을겁니다.

### The Manifest ###

webpack은 모든 모듈이 출력 번들에 매핑되는 방식을 추적합니다.
다른 방법으로 webpack의 [`output`](https://webpack.js.org/configuration/output/)을 관리하는 데 관심이 있다면 매니페스트를 시작하는 것이 좋습니다.
<br /><br />
[WebpackManifestPlugin](https://github.com/danethurber/webpack-manifest-plugin)을 이용하면
manifest 데이터를 json 파일로 추출해 쉽게 사용할 수 있습니다
<br /><br />
프로젝트 내에서 이 플러그인을 사용하는 방법에 대한 완전한 예제는 다루지 않습니다 
[컨셉 페이지](https://webpack.js.org/concepts/manifest/)와 [캐싱 가이드](https://webpack.js.org/guides/caching/)를 읽어 보면 이것이 장기적인 캐싱(long term caching)과 어떤 관련이 있는지 알 수 있습니다.

### Conclusion ###

이제 번들을 HTML에 동적으로 추가하는 방법을 배웠습니다
[개발 가이드](https://webpack.js.org/guides/development/)를 더 보거나 또는 고급 주제를 파헤쳐보고 싶다면 코드 분할 가이드([code splitting guide](https://webpack.js.org/guides/code-splitting/))로 넘어갈 것을 권장합니다.

----

링크 : [ 가이드 원본 링크 바로가기](https://webpack.js.org/guides/output-management/)