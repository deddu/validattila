# validattila [![Build Status][travis-image]][travis-url] [![NPM version][npm-image]][npm-url]
a savage validation library for your client side world

#THIS PRODUCT IS VERY ALPHA USE AT YOUR OWN RISK

## usage:
if you are using browserify or webpack simply require validattila;

have a set of rules:
[]
pass it to validattila to get your validate function. see test.


## recipes:


here's how to implement cross validation on type, or on blur:
AC:
evt: on each blur
check: check both fields
pass: set both valid
fail: set current invalid

example: we want arrive and departure to be in chronological order:

```
const $arrive = $('.the.arrive input');
const $depart = $('.the.departure input');
const chronologically = (validattila/predicates).chrono_order;
rules = [
		{ name:'chronologically',
		test:chronologically,
		pass: function(){console.log('yay!')},
		fail: function(){console.log('boo')}
		}
	]

//pun intended
valiDates = validattila.cb(rules); 

$arrive.on('blur',()=>valiDates($arrive.val(),$depart.val()));
$depart.on('blur',()=>valiDates($arrive.val(),$depart.val()));

```



[travis-image]: https://travis-ci.org/deddu/validattila.svg?branch=master
[travis-url]: https://travis-ci.org/deddu/validattila
[npm-url]:  https://npmjs.org/package/validattila
[npm-image]: http://img.shields.io/npm/v/validattila.svg?style=flat