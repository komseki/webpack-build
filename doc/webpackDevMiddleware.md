## Using webpack-dev-middleware
webpack-dev-middleware는 webpack에서 처리 한 파일을 서버로 내보내는 래퍼입니다. 이것은 webpack-dev-server에서 내부적으로 사용되지만, 원하는 경우 더 많은 사용자 정의 설정을 허용하는 별도의 패키지로 사용할 수 있습니다. webpack-dev-middleware와 익스프레스 서버를 결합한 예제를 살펴 보겠습니다.

express와 webpack-dev-middleware를 설치합니다.

```
npm install --save-dev express webpack-dev-middleware
```

미들웨어가 올바르게 작동하는지 확인하기 위해 webpack.config.js 파일을 수정 합니다.

**webpack.config.js**

``` javascript
output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      
      // output 옵션에 publicPath 속성을 추가 합니다.
      publicPath: '/'
    }
```

[https://webpack.js.org/guides/development/#using-webpack-dev-middleware](https://webpack.js.org/guides/development/#using-webpack-dev-middleware)