const http = require('./http').HttpService;

const q = new http().http('get', 'https://www.tianqiapi.com/api',{}, {
    version: 'v1',
    city: '上海',
});
q.then(console.log).catch(console.log);