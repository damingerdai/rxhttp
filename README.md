![](https://img.shields.io/badge/rxhttp-200-blue.svg)
![](https://img.shields.io/github/license/damingerdai/rxhttp.svg?style=flat)
![](https://img.shields.io/github/last-commit/damingerdai/rxhttp.svg?style=flat)
![](https://img.shields.io/npm/v/damingerdai-rxhttp.svg?style=flat)
![](https://img.shields.io/npm/types/damingerdai-rxhttp.svg?style=flat)

# rxhttp
基于rxjs和request的resfull api请求工具类，使用webpack打包

# 使用

## 下载
如果使用npm
```
npm install damingerdai-rxhttp -S
```
如果使用yarn
```
yarn add damingerdai-rxhttp
```

## 例子
```
const httpService = require('damingerdai-rxhttp').RxHttpService;
const perfixUrl = 'https://www.tianqiapi.com'
const http = new httpService();

const doFilter = (request) => {
    request.url = perfixUrl +  request.url
}

const filter = {
    doFilter:doFilter,
}

http.addFilter(filter);


const observable = http.get('/api', {
    version: 'v1',
    city: '上海',
});
observable.subscribe(res => {
    console.log(res);
})
```