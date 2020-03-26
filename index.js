var co = require('co');
var fs = require('fs');
var axios = require('axios');

// function readFilePromise(path) {
// 	return new Promise(function(resolve, reject) {
// 		fs.readFile(path, {encoding: 'utf8'}, function(err, data) {
// 			if(err) {
// 				reject(err);
// 			} else {
// 				resolve(data);
// 			}
// 		});
// 	});
// }
//=====================================================================
// co(function*() {
// 	// var song1 = yield readFilePromise('./song1.txt');
// 	// var song2 = yield readFilePromise('./song2.txt');
// 	// var song3 = yield readFilePromise('./song3.txt');
// 	// return [song1, song2, song3];
// 	var values = yield[
// 		readFilePromise('./song1.txt'),
// 		readFilePromise('./song2.txt'),
// 		readFilePromise('./song3.txt')
// 	]
// 	return values;
// }).then(function(value) {
// 	console.log(value);
// }).catch(function(err) {
// 	console.log(err);
// });

// var readFiles = co.wrap(function*(files) {
// 	var arr = yield files.map(function(file) {
// 		return readFilePromise(file);
// 	});
// 	return arr;
// });

// readFiles(['./song1.txt', './song2.txt', './song3.txt'])
// 	.then(function(value) {
// 		console.log(value);
// 	}).catch(function(error) {
// 		console.log(error);
// 	})
//=====================================================================
 
var urls = [
  'https://jsonplaceholder.typicode.com/todos/1',
  'https://jsonplaceholder.typicode.com/todos/2',
  'https://jsonplaceholder.typicode.com/todos/3',
  'https://jsonplaceholder.typicode.com/todos/4',
  'https://jsonplaceholder.typicode.com/todos/5'
];

function readFilePromise(path) {
	return new Promise(function(resolve, reject) {
		axios.get(path).then(function(res) {
			resolve(res.data);
		}).catch(function(err) {
			reject(err);
		});
	});
}

//cach 1: for loop
// co(function*() {
// 	var arr = [];
// 	for(var i = 0; i < urls.length; i++)
// 	{
// 		arr.push(yield readFilePromise(urls[i]));
// 	}
// 	return arr;
// }).then(function(values) {
// 	console.log(values);
// }).catch(function(error) {
// 	console.log(error);
// })

//cach 2: array.map
co(function*() {
	var arr = yield urls.map(function(url) {
		return readFilePromise(url);
	});
	return arr;
}).then(function(values) {
	console.log(values);
}).catch(function(error) {
	console.log(error);
})



