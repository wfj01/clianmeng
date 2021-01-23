(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });var


EventChannel = /*#__PURE__*/function () {
  function EventChannel(id, events) {var _this = this;_classCallCheck(this, EventChannel);
    this.id = id;
    this.listener = {};
    this.emitCache = {};
    if (events) {
      Object.keys(events).forEach(function (name) {
        _this.on(name, events[name]);
      });
    }
  }_createClass(EventChannel, [{ key: "emit", value: function emit(

    eventName) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
      var fns = this.listener[eventName];
      if (!fns) {
        return (this.emitCache[eventName] || (this.emitCache[eventName] = [])).push(args);
      }
      fns.forEach(function (opt) {
        opt.fn.apply(opt.fn, args);
      });
      this.listener[eventName] = fns.filter(function (opt) {return opt.type !== 'once';});
    } }, { key: "on", value: function on(

    eventName, fn) {
      this._addListener(eventName, 'on', fn);
      this._clearCache(eventName);
    } }, { key: "once", value: function once(

    eventName, fn) {
      this._addListener(eventName, 'once', fn);
      this._clearCache(eventName);
    } }, { key: "off", value: function off(

    eventName, fn) {
      var fns = this.listener[eventName];
      if (!fns) {
        return;
      }
      if (fn) {
        for (var i = 0; i < fns.length;) {
          if (fns[i].fn === fn) {
            fns.splice(i, 1);
            i--;
          }
          i++;
        }
      } else {
        delete this.listener[eventName];
      }
    } }, { key: "_clearCache", value: function _clearCache(

    eventName) {
      var cacheArgs = this.emitCache[eventName];
      if (cacheArgs) {
        for (; cacheArgs.length > 0;) {
          this.emit.apply(this, [eventName].concat(cacheArgs.shift()));
        }
      }
    } }, { key: "_addListener", value: function _addListener(

    eventName, type, fn) {
      (this.listener[eventName] || (this.listener[eventName] = [])).push({
        fn: fn,
        type: type });

    } }]);return EventChannel;}();


var eventChannels = {};

var eventChannelStack = [];

var id = 0;

function initEventChannel(events) {var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  id++;
  var eventChannel = new EventChannel(id, events);
  if (cache) {
    eventChannels[id] = eventChannel;
    eventChannelStack.push(eventChannel);
  }
  return eventChannel;
}

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var navigateTo = {
  args: function args(fromArgs, toArgs) {
    var id = initEventChannel(fromArgs.events).id;
    if (fromArgs.url) {
      fromArgs.url = fromArgs.url + (fromArgs.url.indexOf('?') === -1 ? '?' : '&') + '__id__=' + id;
    }
  },
  returnValue: function returnValue(fromRes, toRes) {
    fromRes.eventChannel = getEventChannel();
  } };


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  redirectTo: redirectTo,
  navigateTo: navigateTo,
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {args[_key4 - 1] = arguments[_key4];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          // eslint-disable-next-line no-sparse-arrays
          ret.push(handler.apply(handlerCtx, (Array.isArray(params) ? params : []).concat([,,,,,,,,,, event])));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  _vue.default.prototype.getOpenerEventChannel = function () {
    if (!this.__eventChannel__) {
      this.__eventChannel__ = new EventChannel();
    }
    return this.__eventChannel__;
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),
/* 2 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/*!***************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/chuanglianmeng/chuang_uni/pages.json ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/chuanglianmeng/chuang_uni/static/image/swiper/1.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 26 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/chuanglianmeng/chuang_uni/static/image/swiper/2.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 27 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/chuanglianmeng/chuang_uni/static/image/swiper/3.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),
/* 28 */
/*!******************************************************************************************!*\
  !*** C:/Users/Administrator/Desktop/chuanglianmeng/chuang_uni/static/image/swiper/4.jpg ***!
  \******************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map