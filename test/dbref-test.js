'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('DBRef', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok', function () {
    let shell = `db.tests.insert({k: DBRef("collection_name", "__id", "db_name")})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
