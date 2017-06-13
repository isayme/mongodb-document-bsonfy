# mongodb-document-bsonfy
[![Build Status](https://travis-ci.org/isayme/mongodb-document-bsonfy.svg?branch=master)](https://travis-ci.org/isayme/mongodb-document-bsonfy)

A shell function that would bsonfy mongodb documents like what mongoexport does.

# How To Use

**Do not `require` this module in node, use it in a mongo shell**

```
// exporter-example.js
// db.tests.insert({ ... })

load('./lib/bsonfy.js') // path to bsonfy.js
db.tests.find({}).forEach(function (doc) {
  print(bsonfy(doc))
})
```

> mongodb exporter-example.js

# Defects
- NumberInt not support
  - we can't distinguish a number from `double` and `int` in mongo shell
