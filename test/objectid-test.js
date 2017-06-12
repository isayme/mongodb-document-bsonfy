'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('ObjectId', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok', function () {
    let shell = `db.tests.insert({_id: ObjectId("5937e628a7c367bd9379bae6")})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
