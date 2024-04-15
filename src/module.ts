import { spawn as spawnFunction } from 'child_process';
import { createSpawn } from './factories/spawn';

export const spawn = createSpawn(__dirname, spawnFunction);
