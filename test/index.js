const http = require('./rxhttp').RxHttpService;

const observable = new http().get('https://www.tianqiapi.com/api', {
    version: 'v1',
    city: '上海',
});
observable.subscribe(res => {
    console.log(res);
})