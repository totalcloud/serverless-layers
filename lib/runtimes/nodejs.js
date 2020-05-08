"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var path = require('path');

var NodeJSRuntime = /*#__PURE__*/function () {
  function NodeJSRuntime(parent, runtime, runtimeDir) {
    (0, _classCallCheck2["default"])(this, NodeJSRuntime);
    this.parent = parent;
    this.plugin = parent.plugin;
    this["default"] = {
      runtime: runtime,
      runtimeDir: runtimeDir,
      libraryFolder: 'node_modules',
      packageManager: 'npm',
      dependenciesPath: 'package.json',
      compatibleRuntimes: [runtimeDir],
      copyBeforeInstall: ['yarn.lock', 'package-lock.json'],
      packageExclude: ['node_modules/**']
    };
    this.commands = {
      npm: 'npm install --production --only=prod',
      yarn: 'yarn --production'
    };
  }

  (0, _createClass2["default"])(NodeJSRuntime, [{
    key: "init",
    value: function init() {
      var dependenciesPath = this.plugin.settings.dependenciesPath;
      var localpackageJson = path.join(process.cwd(), dependenciesPath);

      try {
        this.localPackage = require(localpackageJson);
      } catch (e) {
        this.plugin.log("Error: Can not find ".concat(localpackageJson, "!"));
        process.exit(1);
      }
    }
  }, {
    key: "isCompatibleVersion",
    value: function () {
      var _isCompatibleVersion = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(runtime) {
        var osVersion, _runtime$match, _runtime$match2, runtimeVersion;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.parent.run('node --version');

              case 2:
                osVersion = _context.sent;
                _runtime$match = runtime.match(/([0-9.]+)/), _runtime$match2 = (0, _slicedToArray2["default"])(_runtime$match, 1), runtimeVersion = _runtime$match2[0];
                return _context.abrupt("return", {
                  version: osVersion,
                  isCompatible: osVersion.startsWith("v".concat(runtimeVersion))
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function isCompatibleVersion(_x) {
        return _isCompatibleVersion.apply(this, arguments);
      }

      return isCompatibleVersion;
    }()
  }, {
    key: "isDiff",
    value: function isDiff(depsA, depsB) {
      if (!depsA) {
        return true;
      }

      var depsKeyA = Object.keys(depsA);
      var depsKeyB = Object.keys(depsB);
      var isSizeEqual = depsKeyA.length === depsKeyB.length;
      if (!isSizeEqual) return true;
      var hasDifference = false;
      Object.keys(depsA).forEach(function (dependence) {
        if (depsA[dependence] !== depsB[dependence]) {
          hasDifference = true;
        }
      });
      return hasDifference;
    }
  }, {
    key: "hasDependencesChanged",
    value: function () {
      var _hasDependencesChanged = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var remotePackage, isDifferent;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.plugin.bucketService.downloadDependencesFile();

              case 2:
                remotePackage = _context2.sent;
                isDifferent = true;

                if (remotePackage) {
                  isDifferent = JSON.stringify(this.localPackage) !== remotePackage;
                }

                return _context2.abrupt("return", isDifferent);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function hasDependencesChanged() {
        return _hasDependencesChanged.apply(this, arguments);
      }

      return hasDependencesChanged;
    }()
  }]);
  return NodeJSRuntime;
}();

module.exports = NodeJSRuntime;
//# sourceMappingURL=nodejs.js.map