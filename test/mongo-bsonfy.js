'use strict'
/* global db, print, bsonfy, load */

load('./lib/bsonfy.js')

db.tests.find({}).forEach(function (doc) {
  print(bsonfy(doc))
})
