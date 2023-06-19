#!/usr/bin/env node

import * as p from 'node:path'
import * as h from './index'

const [, , cmd, ...args] = process.argv
const ln = args.length
const [from, ...to] = args

const help = (code: number) => {
  console.log(`Usage:
    ${h.name} run <from> <to> [<to> ...]
    `)
  process.exit(code)
}

const cmds: { [key: string]: () => void } = {
  run: () => {
    ln < 2 ? help(2) : h.run(from, ...to)
  },
  '-v': () => {
    console.log(require(p.join(__dirname, '../package.json')).version)
  },
}

try {
  cmds[cmd] ? cmds[cmd]() : help(0)
} catch (e) {
  console.error(e instanceof Error ? `${h.name} - ${e.message}` : e)
  process.exit(1)
}
