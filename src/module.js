const { spawn } = require('child_process');
const { createSpawn } = require('./factories/spawn');

module.exports.spawn = createSpawn(__dirname, spawn);
