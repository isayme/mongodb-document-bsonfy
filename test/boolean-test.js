'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('Boolean', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok with false', function () {
    let shell = `db.tests.insert({k: false})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok with true', function () {
    let shell = `db.tests.insert({k: true})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
