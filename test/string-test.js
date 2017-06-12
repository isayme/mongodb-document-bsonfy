'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('String', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok', function () {
    let shell = `db.tests.insert({k: "abc"})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok with <>', function () {
    let shell = `db.tests.insert({k: "<>"})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok with 中文', function () {
    let shell = `db.tests.insert({k: "你好"})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })

  it('should ok with \\n', function () {
    let shell = `db.tests.insert({k: "v\\nv"})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
