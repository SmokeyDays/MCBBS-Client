/**
 *@author langyo
 *@file 本地存储支持
 */

import ls from "local-storage";

const once = fn => {
  let done = false;
  return function() {
    return done ? undefined : ((done = true), fn.apply(this, arguments));
  };
};

let data = [];
let dataRecycle = {};
let nodeCount = 0;

let init = once(() => {
  let nodeCount = 0 + ls("nodeCount");
  for (let i = 0; i < nodeCount; ++i) data.push(JSON.parse(ls("node" + i)));
});
init();

let initGlobal = once(() => {
  if (ls("_init") != undefined) {
    // ls("_init", "true");
  }
});

function Node(type, value) {
  this.type = type;
  switch (type) {
    case "node":
      this.value = {};
      break;
    case "list":
      this.value = [];
      break;
    case "bigData":
      this.value = new Data(value).id();
      break;
    case "data":
    default:
      this.type = "data";
      this.value = value;
      break;
  }
  this.id = nodeCount++;
  ls("nodeCount", nodeCount);
}

function Data(value) {}

function slicePath(str) {
  let n,
    ret = [];
  str = str.trim();

  while ((n = str.indexOf("."))) {
    ret.push(str.slice(0, n));
    str = str.slice(n + 1).trim();
  }
  ret.push(str.trim());
  return ret;
}

function parsePath(path) {
  let nowAt = 0;

  while (path.length > 1) {
    if (data[nowAt].type !== "node" && data[nowAt].type !== "list") return;
    nowAt = 0 + data[nowAt].value[path.shift()];
  }
  return nowAt;
}

function get(path) {
  let nowAt = parsePath(slicePath(path));

  switch (data[nowAt].type) {
    case "bigData":
      return load(data[owAt].value[path.shift()]);
    case "data":
      return data[nowAt].value[path.shift()];
    default:
      return;
  }
}

function load(data) {}

function set(path, value) {
  path = slicePath(path);
  let name = path[path.length - 1];
  let nowAt = parsePath(path.pop());

  switch (data[nowAt].type) {
    case "bigData":
      ls("data" + data[nowAt].value[name], value);
      load();
  }
}
