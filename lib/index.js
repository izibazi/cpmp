"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.name = void 0;
var cp = require("child_process");
var git = function (args) { return cp.spawnSync('git', args, { encoding: 'utf-8' }); };
exports.name = require('../package.json').name;
function run(from) {
    var to = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        to[_i - 1] = arguments[_i];
    }
    var base = git(['branch', '--contains']).stdout.trim().split(' ')[1];
    try {
        for (var _a = 0, to_1 = to; _a < to_1.length; _a++) {
            var i = to_1[_a];
            console.log("\u2705 merge ".concat(from, " to ").concat(i));
            console.log("\u2714\uFE0E git checkout ".concat(i));
            var checkouted = git(['checkout', i]);
            if (checkouted.status !== 0) {
                throw new Error("".concat(checkouted.stderr));
            }
            var pulled = git(['pull', 'origin', i]);
            console.log("\u2714\uFE0E git merge ".concat(from, " --no-edit"));
            var merged = git(['merge', from, '--no-edit']);
            if (merged.status !== 0) {
                throw new Error("".concat(merged.stderr));
            }
            console.log("\u2714\uFE0E git push -u origin ".concat(i));
            var pushed = git(['push', '-u', 'origin', i]);
            if (pushed.status !== 0) {
                throw new Error("".concat(pushed.stderr));
            }
        }
    }
    catch (e) {
        throw e;
    }
    finally {
        git(['checkout', base]);
    }
    console.log("\u2705 checkout, pull, merge, push successfully!");
}
exports.run = run;
