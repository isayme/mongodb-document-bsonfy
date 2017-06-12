'use strict'

const execSync = require('child_process').execSync

exports.exec = function (cmd) {
  try {
    return execSync(cmd, {
      encoding: 'utf8'
    })
  } catch (err) {
    console.error('exec error!')
    console.log('cmd:', err.cmd)
    console.log('stack:', err.stdout)
  }
}

exports.mongodb = {
  exec: function (shell) {
    let cmd = `mongo bsonfy-test --quiet --eval '${shell}'`
    return exports.exec(cmd)
  },
  export: function () {
    let cmd = 'mongoexport --quiet --db=bsonfy-test --collection=tests --query={}'
    return exports.exec(cmd)
  },
  bsonfy: function () {
    let cmd = `mongo bsonfy-test --quiet ./test/mongo-bsonfy.js`
    return exports.exec(cmd)
  },
  clear: function () {
    let cmd = 'mongo bsonfy-test --quiet --eval "db.tests.remove({})"'
    return exports.exec(cmd)
  }
}
