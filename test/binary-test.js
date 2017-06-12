'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('Binary', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok if subtype <= 15', function () {
    let shell = `db.tests.insert({k: BinData(15, "aGVsbG8=")})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok if subtype > 15', function () {
    let shell = `db.tests.insert({k: BinData(16, "aGVsbG8=")})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
