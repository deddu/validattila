'use strict';
const predicates = require('./predicates/predicates.js');
const predidates = require('./predicates/dates.js');

var defaultrules = [{

}];

function call_cb(r,args){
				let v = r.test(...args);
				//side effect time!
				(v)
					? r.success(r,...args)
					: r.fail(r,...args);

				return v;
			};

function call_evt(r,bus,args){
				let v = r.test(...args);
				//side effect time!
				(v)
					? bus.trigger(r.pass_trigger, args)
					: bus.trigger(r.fail_trigger, args);
					
				return v;
			};

/**
returns a validation function that uses callback api.
@returns {Function}
*/
function validate_cb(rules){
	return (...args) => predicates.all(
		rules.map((x) => call_cb(x,args)));
};
/**
returns a validation function that uses event api.
@param {EventEmitter} bus object that implements a metod named 'trigger'; 
@returns {Function}
*/
function validate_evt(rules,bus){
	return (...args) => predicates.all(
		rules.map((x) => call_evt(x,bus,args)));
};


module.exports = function(){
	return {
 		cb:  validate_cb,
	 	evt: validate_evt
	};
}