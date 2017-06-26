'use strict'
/* global ObjectId, Timestamp, NumberLong, DBRef, MinKey, MaxKey, BinData */

/* eslint-disable no-unused-vars */
var bsonfy = (function () {
  var toString = Object.prototype.toString
  var isArray = Array.isArray
  var escMap = {
    '"': '\\"',
    '\\': '\\\\',
    '\b': '\\b',
    '\f': '\\f',
    '\n': '\\n',
    '\r': '\\r',
    '\t': '\\t'
  }
  var escFunc = function (m) {
    return escMap[m] || '\\u' + (m.charCodeAt(0) + 0x10000).toString(16).substr(1)
  }
  var escRE = /[\\"\u0000-\u001F\u2028\u2029&<>]/g

  return function stringify (value) {
    var tmp

    if (value instanceof ObjectId) {
      return stringify({
        '$oid': value.valueOf()
      })
    } else if (value instanceof Date) {
      var timestamp = value.getTime()
      // refer: https://github.com/mongodb/mongo/blob/6471618952c8727bc5b06039ed2cf861e1a36436/src/mongo/gotools/common/json/mongo_extjson.go#L103
      if (timestamp >= 32535215999000) {
        return stringify({
          '$date': {
            '$numberLong': '' + timestamp
          }
        })
      } else {
        return stringify({
          '$date': value.toISOString()
        })
      }
    } else if (value === null) {
      return 'null'
    } else if (value === undefined) {
      return stringify({
        '$undefined': true
      })
    } else if (value instanceof Timestamp) {
      return '{"$timestamp":{"t":' + value.t + ',"i":' + value.i + '}}'
    } else if (value instanceof NumberLong) {
      return '{"$numberLong":"' + value.valueOf() + '"}'
    } else if (value instanceof RegExp) {
      var regex = value.source
      var regopts = [
        value.global ? 'g' : '',
        value.ignoreCase ? 'i' : '',
        value.multiline ? 'm' : '',
        value.unicode ? 'u' : '',
        value.sticky ? 'y' : ''
      ].join('')
      return stringify({
        '$regex': regex,
        '$options': regopts
      })
    } else if (value instanceof MinKey) {
      return '{"$minKey":1}'
    } else if (value instanceof MaxKey) {
      return '{"$maxKey":1}'
    } else if (value instanceof BinData) {
      var subtype = value.subtype()
      return stringify({
        '$binary': value.base64(),
        '$type': (subtype > 15 ? '' : '0') + subtype.toString(16)
      })
    } else if (value instanceof DBRef) {
      return stringify({
        '$ref': value.$ref,
        '$id': value.$id,
        '$db': value.$db
      })
    } else if (typeof value === 'number') {
      if (isNaN(value)) {
        return 'NaN'
      } else if (value === Number.POSITIVE_INFINITY) {
        return '+Infinity'
      } else if (value === Number.NEGATIVE_INFINITY) {
        return '-Infinity'
      } else if (value === 0 && (1 / value) === Number.NEGATIVE_INFINITY) {
        return '-0.0'
      } else {
        if (value > -1000000 && value < 1000000) {
          tmp = value.toString()
        } else {
          tmp = value.toExponential()
        }
        if (tmp.indexOf('e') < 0) {
          if (tmp.split('.').length < 2) {
            tmp += '.0'
          }
        } else {
          tmp = tmp.replace(/(e[+-])(\d){1}$/, function (m, p1, p2) {
            return p1 + '0' + p2
          })
        }
        return tmp
      }
    } else if (typeof value === 'boolean') {
      return value.toString()
    } else if (typeof value === 'object') {
      if (isArray(value)) {
        tmp = []
        for (var i = 0; i < value.length; i++) {
          tmp.push(stringify(value[i]))
        }
        return '[' + tmp.join(',') + ']'
      } else if (toString.call(value) === '[object BSON]' || toString.call(value) === '[object Object]') {
        tmp = []
        for (var k in value) {
          if (value.hasOwnProperty(k)) {
            tmp.push(stringify(k) + ':' + stringify(value[k]))
          }
        }
        return '{' + tmp.join(',') + '}'
      }
    }
    return '"' + value.toString().replace(escRE, escFunc) + '"'
  }
})()
