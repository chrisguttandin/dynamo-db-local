# dynamo-db-local

**A wrapper around Amazon's DynamoDB Local to start and stop it from Node.js.**

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

If you need more control over the command line parameters passed on to DynamoDB Local, you may want
to have a look at [local-dynamo](https://github.com/apto/local-dynamo).
