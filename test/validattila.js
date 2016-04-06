'use strict';
const expect = require('chai').expect;
const vattila = require('../src/validattila.js')();

describe('test api cb',function(){
	const rules = [{
		name:'always true',
		test: (x)=>true,
		success: (x)=>(console.log('success',x),x),
		fail:()=>(console.log('fail',x),x)
	}];
	const validate = vattila.cb(rules);

	it('doesn\'t explode', function(){
		expect(validate('one two three')).to.be.equal(true);
	});
});

describe('test api evt',function(){
	const bus = { 
		trigger: (evtname, args) => (console.log('trigger: ', evtname, ' args:', args), evtname)
	};
	const rules = [{
		name:'always true',
		test: (x)=>true,
		pass_trigger: 'passed',
		fail_trigger: 'failed'
	}];
	const validate = vattila.evt(rules,bus);

	it('doesn\'t explode', function(){
		expect(validate('one two three')).to.be.equal(true);
	});
});