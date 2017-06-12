'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('Regex', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok with /[a-z]/gi', function () {
    let shell = `db.tests.insert({k: /[a-z]/gi})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok with new RegExp("[a-z]", "gi")', function () {
    let shell = `db.tests.insert({k: new RegExp("[a-z]")})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
