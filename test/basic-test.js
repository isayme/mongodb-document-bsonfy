'use strict'

const assert = require('power-assert')
const utils = require('./utils')

describe('Keys', function () {
  beforeEach(function () {
    utils.mongodb.clear()
  })

  it('should ok with <>', function () {
    let shell = `db.tests.insert({"<k>": true})`
    utils.mongodb.exec(shell)
    let expected = utils.mongodb.export()
    let result = utils.mongodb.bsonfy()
    assert.equal(result, expected)
  })
})
