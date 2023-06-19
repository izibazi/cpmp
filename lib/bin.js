#!/usr/bin/env node
"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var p = require("node:path");
var h = require("./index");
var _a = process.argv, cmd = _a[2], args = _a.slice(3);
var ln = args.length;
var from = args[0], to = args.slice(1);
var help = function (code) {
    console.log("Usage:\n    ".concat(h.name, " run <from> <to> [<to> ...]\n    "));
    process.exit(code);
};
var cmds = {
    run: function () {
        ln < 2 ? help(2) : h.run.apply(h, __spreadArray([from], to, false));
    },
    '-v': function () {
        console.log(require(p.join(__dirname, '../package.json')).version);
    },
};
try {
    cmds[cmd] ? cmds[cmd]() : help(0);
}
catch (e) {
    console.error(e instanceof Error ? "".concat(h.name, " - ").concat(e.message) : e);
    process.exit(1);
}
