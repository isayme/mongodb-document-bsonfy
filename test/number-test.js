'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('Number', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  let cases = {
    '0': 0,
    '1': 1,
    '-1': -1,
    '1.2': 1.2,
    '-1.2': -1.2,
    '0.012': 0.012,
    '-0.012': -0.012,
    '0.000000012': 0.000000012,
    '-0.000000012': -0.000000012,
    '0.0000000000000012': 0.0000000000000012,
    '-0.0000000000000012': -0.0000000000000012,
    '999999': 999999,
    '-999999': -999999,
    '1000000': 1000000,
    '-1000000': -1000000,
    '1000001': 1000000,
    '-1000001': -1000001,
    'Number.MIN_SAFE_INTEGER': Number.MIN_SAFE_INTEGER,
    'Number.MAX_SAFE_INTEGER': Number.MAX_SAFE_INTEGER,
    'Number.MIN_VALUE': Number.MIN_VALUE,
    '-Number.MIN_VALUE': -Number.MIN_VALUE,
    'Number.MAX_VALUE': Number.MAX_VALUE,
    '-Number.MAX_VALUE': -Number.MAX_VALUE,
    'Number.MIN_VALUE / 10': Number.MIN_VALUE / 10,
    '-Number.MIN_VALUE / 10': -Number.MIN_VALUE / 10,
    'Number.MAX_VALUE / 10': Number.MAX_VALUE / 10,
    '-Number.MAX_VALUE / 10': -Number.MAX_VALUE / 10,
    'Number.NaN': Number.NaN,
    'Infinity': Infinity,
    '+Infinity': +Infinity,
    '-Infinity': -Infinity
  }
  for (let name in cases) {
    it(`should ok with [${name}]`, function () {
      let shell = `db.tests.insert({k: ${cases[name]}})`
      utils.mongodb.exec(shell)
      let expected = utils.mongodb.export()
      let result = utils.mongodb.bsonfy()
      assert.equal(result, expected)
    })
  }

  for (let i = -400; i < 400; i += 7) {
    it(`should ok with integer [Math.pow(10, ${i})]`, function () {
      utils.mongodb.exec(`db.tests.insert({k: ${Math.pow(10, i)}})`)
      utils.mongodb.exec(`db.tests.insert({k: ${Math.pow(10, i)} + 1})`)
      utils.mongodb.exec(`db.tests.insert({k: ${Math.pow(10, i)} - 1})`)
      utils.mongodb.exec(`db.tests.insert({k: -${Math.pow(10, i)}})`)
      utils.mongodb.exec(`db.tests.insert({k: -${Math.pow(10, i)} + 1})`)
      utils.mongodb.exec(`db.tests.insert({k: -${Math.pow(10, i)} - 1})`)
      let expected = utils.mongodb.export()
      let result = utils.mongodb.bsonfy()
      assert.equal(result, expected)
    })
  }

  for (let i = -400; i < 400; i += 7) {
    it(`should ok with floats [Math.pow(10, ${i})]`, function () {
      utils.mongodb.exec(`db.tests.insert({k: ${Math.pow(10, i)}})`)
      utils.mongodb.exec(`db.tests.insert({k: ${Math.pow(10, i)} + 0.1})`)
      utils.mongodb.exec(`db.tests.insert({k: ${Math.pow(10, i)} - 0.1})`)
      utils.mongodb.exec(`db.tests.insert({k: -${Math.pow(10, i)}})`)
      utils.mongodb.exec(`db.tests.insert({k: -${Math.pow(10, i)} + 0.1})`)
      utils.mongodb.exec(`db.tests.insert({k: -${Math.pow(10, i)} - 0.1})`)
      let expected = utils.mongodb.export()
      let result = utils.mongodb.bsonfy()
      assert.equal(result, expected)
    })
  }
})
