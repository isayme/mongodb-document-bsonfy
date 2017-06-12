'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('NumberLong', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok', function () {
    let shell = `db.tests.insert({k: NumberLong("92233720368547")})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
