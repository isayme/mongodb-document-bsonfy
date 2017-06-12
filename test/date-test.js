'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('Date', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok', function () {
    let shell = `db.tests.insert({d: new Date(32535215998999)})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok', function () {
    let shell = `db.tests.insert({d: new Date(32535215999000)})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
