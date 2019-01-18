const http = require('./http').HttpService;
console.log(new http());
console.log(new http().http('get', 'https://api.github.com/search/issues?q=repo:angular/material2').then(console.log).catch(console.log));