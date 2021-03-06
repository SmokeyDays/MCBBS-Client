"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "thread": {
    "url": ["thread-[0-9]+-[0-9]+-1\\.html", "forum\\.php\\?mod=viewthread&tid=[0-9]+&page=[0-9]+(#pid[0-9]+)?"],
    "preload": ["pageParser/watchThread"]
  },
  "users": {
    "url": ["home\\.php\\?mod=space&username=.+", "\\?[0-9]+", "home.php\\?mod=space&uid=[0-9]+"],
    "preload": ["pageParser/userInfo"]
  },
  "forum": {
    "url": ["forum-[a-zA-Z0-9]+-[0-9]+\.html"],
    "preload": ["pageParser/forum"]
  },
  "index-threads-list": {
    "url": ["forum\.php\?mod=guide&view={hot|digest|new|newthread}"],
    "preload": ["pageParser/threadGroup"]
  }
};
exports.default = _default;