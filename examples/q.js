const http = require('./http').HttpService;
console.log(new http());
const q = new http().http('get', 'https://api.github.com/search/issues?q=repo:angular/material2');
console.log(q);