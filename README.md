# dynamo-db-local

**A wrapper around Amazon's DynamoDB Local to start and stop it from Node.js.**

[![tests](https://img.shields.io/travis/chrisguttandin/dynamo-db-local/master.svg?style=flat-square)](https://travis-ci.org/chrisguttandin/dynamo-db-local)
[![dependencies](https://img.shields.io/david/chrisguttandin/dynamo-db-local.svg?style=flat-square)](https://www.npmjs.com/package/dynamo-db-local)
[![version](https://img.shields.io/npm/v/dynamo-db-local.svg?style=flat-square)](https://www.npmjs.com/package/dynamo-db-local)

This module wraps Amazon's
[DynamoDB Local](http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Tools.DynamoDBLocal.html).
It just exposes one method called `spawn()` which does nothing more than calling
[`child_process.spawn()`](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
and returning it's result.

```js
var dynamoDbLocalProcess = dynamoDbLocal.spawn();
// ...
dynamoDbLocalProcess.kill();
```

Optionally, you can customize the port number that the process will run on:

```js
var port = 8001;
var dynamoDbLocalProcess = dynamoDbLocal.spawn(port);
// ...
dynamoDbLocalProcess.kill();
```

If you need more control over the command line parameters passed on to DynamoDB Local, you may want
to have a look at [local-dynamo](https://github.com/apto/local-dynamo).
