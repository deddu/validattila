'use strict';

/**
verify that the input exists and is empty (an object or an empty array);
*/
function empty(x){
    return existy(x) && (typeof x == 'object')
        ? ( Array.isArray(x))
            ? x.length === 0
            : Object.keys(x).length === 0
                && JSON.stringify(x) === JSON.stringify({})
        : ! x  ;
}



function notEmpty(x){
    return not(empty)(x) ;
}
/**
verify that the input exists (is not null nor undefined);
*/ 
function existy(x){
    return (x !== null && x !== undefined);
}

/**
verify that the input exists (is not null nor undefined);
*/ 
function truthy(x){
  return (existy(x) && x !== false);
}

//composites


/**
verify that all elements of the array are true;
@param {Array} arr array of booleans
*/ 
function all(arr){
    return !!arr && arr.reduce((acc,x) => x && acc, true);
}

/**
verify that at least one element of the array is true;
@param {Array} arr array of booleans
*/ 
function any(arr){
    return !!arr && arr.reduce((acc,x) => x || acc, false);
}


// higher order decorators and combinators:

/**
negates another predicate;
@param {Function} f another predicate function
@returns {Function} 
*/ 
function not(f){
    return (...args) => !f(...args);
}

/**
Applies the same predicate to two variables and returns the logical and;
@param {Function} f another predicate, f(x)
@returns {Function} g(x,y) function of two values.
*/ 
function both(f){
    return (x,y,...args) => f(x,...args) && f(y,...args);
}

/**
wraps the function for sideeffects;
@example
shitandgiggles = p.wrap(
     ()=>(console.log('*giggles*','a')), 
     (stuff)=>(console.log('shit!',stuff),'b') );

var x = shitandgiggles(123);
// log: shit! 
// log: *giggles* a
console.log(x);
// log: [123]

*/
function wrap (f, sideeffect){
  return (...args) => (sideeffect(...args),
    f(...args));
}




/**
standard tap the function for sideeffects;
@returns {Function} will take a function, execute it with the value for side effects and return the value
@example
var giggles = p.tap('*giggles*');
var y = giggles((x) => {console.log(`shit and ${x}`)} );
// log:  shit and *giggles*
console.log(y);
// log: *giggles*

*/
const tap = (value) =>
 (fn) => (
    typeof(fn) === 'function' && fn(value),
  value )



/**
composes all the input predicates into one predicate that passes IFF all the predicates are satisfied by the same value;
@returns {Function} f new predicate describing the intersection of the input predicates
@example
var idealWifeyTest = p.allF(isBeautiful,isRich,likesVideoGames);
var wifeyCandidates = ['sharon stone','margaret tatcher','jenna jameson'];

console.log(wifeyCandidates.map(idealWifeyTest));
// [false, false, false]

*/
function allF(...funcs){
  return (...args) => funcs.reduce( (acc,x) => x.apply(null, args) && acc, true);
}

/**
composes all the input predicates into one predicate that passes if any of the predicates are satisfied by the same value;
@returns {Function} f new predicate describing the union of the input predicates
@example
var badWifeTest = p.anyF(isNasty, isGreedy, isDead, isOld);
var wifeyCandidates = ['sharon stone','margaret tatcher','jenna jameson'];

console.log(wifeyCandidates.map(badWifeTest));
// [true, true, true]

*/
function anyF(...funcs){
  return (...args) => funcs.reduce( (acc,x) => x.apply(null, args) || acc, false);
}

module.exports = {
    empty: empty,
    notEmpty: notEmpty,
    existy: existy,
    truthy: truthy,
    all: all,
    any: any,
    not: not,
    both: both,
    wrap:wrap,
    tap: tap,
    allF: allF,
    anyF: anyF
}

