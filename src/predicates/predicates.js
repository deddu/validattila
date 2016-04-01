'use strict';

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

function existy(x){
    return (x !== null && x !== undefined);
}

function truthy(x){
  return (existy(x) && x !== false);
}

//composites

function all(arr){
    return !!arr && arr.reduce((acc,x) => x && acc, true);
}

function any(arr){
    return !!arr && arr.reduce((acc,x) => x || acc, false);
}


// higher order decorators and combinators:

function not(f){
    return (...args) => !f(...args);
}

function both(f){
    return (x,y,...args) => f(x,...args) && f(y,...args);
}

function allF(...funcs){
  return (...args) => funcs.reduce( (acc,x) => x.apply(null, args) && acc, true);
}

function anyF(...funcs){
  return (...args) => funcs.reduce( (acc,x) => x.apply(null, args) || acc, false);
}
