// 接口提供商： https://www.tianqiapi.com/
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