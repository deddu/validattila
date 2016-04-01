function toDate(day){
  if (lookLikeADate(day)){
     return isDate(day)
          ? day
          : new Date(day);
  } else {
    console.warn(day, "doesn't look like a date. So I'll cast it to now.");
    return new Date();
  }
}

// combinators
function compose(f, ...rest) {
  return (rest.length === 0)
      ? f
      : (...x) => f(compose(...rest)(x));
  };

//pipeline applies in sequence
function pipeline(...fns){
  return (...x) => fns.reduce( (acc, f) => f.apply(null, [acc]), x);
}


module.exports = {
  toDate:toDate,
  pipeline:pipeline,
  compose:compose
};