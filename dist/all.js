"use strict";

function toDate(day) {
  if (lookLikeADate(day)) {
    return isDate(day) ? day : new Date(day);
  } else {
    console.warn(day, "doesn't look like a date. So I'll cast it to now.");
    return new Date();
  }
}

// combinators
function compose(f) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  return rest.length === 0 ? f : function () {
    for (var _len2 = arguments.length, x = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      x[_key2] = arguments[_key2];
    }

    return f(compose.apply(undefined, rest)(x));
  };
};

//pipeline applies in sequence
function pipeline() {
  for (var _len3 = arguments.length, fns = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    fns[_key3] = arguments[_key3];
  }

  return function () {
    for (var _len4 = arguments.length, x = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      x[_key4] = arguments[_key4];
    }

    return fns.reduce(function (acc, f) {
      return f.apply(null, [acc]);
    }, x);
  };
}

module.exports = {
  toDate: toDate,
  pipeline: pipeline,
  compose: compose
};
'use strict';

var predicates = require('./predicates/predicates.js');
var predidates = require('./predicates/dates.js');

var defaultrules = [{}];
'use strict';

var toDate = require('../helpers.js').toDate;

// predicates for dates
function isDate(day) {
  return day instanceof Date;
}

function isValidDate(day) {
  return isDate(day) && day != 'Invalid Date';
}

function lookLikeADate(day) {
  return isValidDate() || new Date(day) != 'Invalid Date';
}

function afterYesterday(day) {
  return yesterday < toDate(day);
}

function beforeMaxDay(maxday) {
  return function (day) {
    return toDate(day) < toDate(maxday);
  };
}

function lessThanInterval(maxdays) {
  return function (start, end) {
    return Math.abs(toDate(end).getTime() - toDate(start).getTime()) < 864e5 * maxdays;
  };
}

function chronoOrder(arrive, depart) {
  return toDate(arrive) < toDate(depart);
}
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function empty(x) {
    return existy(x) && (typeof x === 'undefined' ? 'undefined' : _typeof(x)) == 'object' ? Array.isArray(x) ? x.length === 0 : Object.keys(x).length === 0 && JSON.stringify(x) === JSON.stringify({}) : !x;
}

function notEmpty(x) {
    return not(empty)(x);
}

function existy(x) {
    return x !== null && x !== undefined;
}

function truthy(x) {
    return existy(x) && x !== false;
}

//composites

function all(arr) {
    return !!arr && arr.reduce(function (acc, x) {
        return x && acc;
    }, true);
}

function any(arr) {
    return !!arr && arr.reduce(function (acc, x) {
        return x || acc;
    }, false);
}

// higher order decorators and combinators:

function not(f) {
    return function () {
        return !f.apply(undefined, arguments);
    };
}

function both(f) {
    return function (x, y) {
        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
        }

        return f.apply(undefined, [x].concat(args)) && f.apply(undefined, [y].concat(args));
    };
}

function allF() {
    for (var _len2 = arguments.length, funcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        funcs[_key2] = arguments[_key2];
    }

    return function () {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
        }

        return funcs.reduce(function (acc, x) {
            return x.apply(null, args) && acc;
        }, true);
    };
}

function anyF() {
    for (var _len4 = arguments.length, funcs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        funcs[_key4] = arguments[_key4];
    }

    return function () {
        for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            args[_key5] = arguments[_key5];
        }

        return funcs.reduce(function (acc, x) {
            return x.apply(null, args) || acc;
        }, false);
    };
}
//# sourceMappingURL=all.js.map
