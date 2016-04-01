'use strict';
const toDate = require('../helpers.js').toDate;

// predicates for dates
function isDate(day){
  return day instanceof Date;
}

function isValidDate(day){
  return isDate(day) && day != 'Invalid Date';
}

function lookLikeADate(day){
  return (isValidDate() || (new Date(day)) != 'Invalid Date' );
}

function afterYesterday (day){
    return yesterday < toDate(day);
}

function beforeMaxDay(maxday){
    return (day) => toDate(day) < toDate(maxday);
}

function lessThanInterval (maxdays){
    return (start, end) => Math.abs(toDate(end).getTime() - toDate(start).getTime() ) < (864e5 * maxdays);
}

function chronoOrder (arrive, depart){
  return toDate(arrive) < toDate(depart);
}