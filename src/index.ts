import * as cp from 'child_process'

const git = (args: string[]) => cp.spawnSync('git', args, { encoding: 'utf-8' })
export const name = require('../package.json').name
export function run(from: string, ...to: string[]) {
  const base = git(['branch', '--contains']).stdout.trim().split(' ')[1]
  try {
    for (const i of to) {
      console.log(`✅ merge ${from} to ${i}`)
      console.log(`✔︎ git checkout ${i}`)
      const checkouted = git(['checkout', i])
      if (checkouted.status !== 0) {
        throw new Error(`${checkouted.stderr}`)
      }
      const pulled = git(['pull', 'origin', i])
      console.log(`✔︎ git merge ${from} --no-edit`)
      const merged = git(['merge', from, '--no-edit'])
      if (merged.status !== 0) {
        throw new Error(`${merged.stderr}`)
      }
      console.log(`✔︎ git push -u origin ${i}`)
      const pushed = git(['push', '-u', 'origin', i])
      if (pushed.status !== 0) {
        throw new Error(`${pushed.stderr}`)
      }
    }
  } catch (e) {
    throw e
  } finally {
    git(['checkout', base])
  }

  console.log(`✅ checkout, pull, merge, push successfully!`)
}
