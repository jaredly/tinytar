(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tinyTar"] = factory();
	else
		root["tinyTar"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	// http://www.gnu.org/software/tar/manual/html_node/Standard.html
	
	var utils = __webpack_require__(2);
	var constants = __webpack_require__(1);
	var tar = __webpack_require__(4);
	var untar = __webpack_require__(5);
	
	utils.extend(module.exports, tar, untar, constants);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	var NULL_CHAR = '\u0000';
	
	module.exports = {
	  /* eslint-disable key-spacing */
	
	  NULL_CHAR: NULL_CHAR,
	
	  TMAGIC: 'ustar' + NULL_CHAR + '00',   // 'ustar', NULL, '00'
	  OLDGNU_MAGIC: 'ustar  ' + NULL_CHAR,  // 'ustar  ', NULL
	
	  // Values used in typeflag field.
	  REGTYPE:  0,  // regular file
	  LNKTYPE:  1,  // link
	  SYMTYPE:  2,  // reserved
	  CHRTYPE:  3,  // character special
	  BLKTYPE:  4,  // block special
	  DIRTYPE:  5,  // directory
	  FIFOTYPE: 6,  // FIFO special
	  CONTTYPE: 7,  // reserved
	
	  // Bits used in the mode field, values in octal.
	  TSUID: parseInt('4000', 8),  // set UID on execution
	  TSGID: parseInt('2000', 8),  // set GID on execution
	  TSVTX: parseInt('1000', 8),  // reserved
	
	  // file permissions
	  TUREAD:  parseInt('0400', 8),  // read by owner
	  TUWRITE: parseInt('0200', 8),  // write by owner
	  TUEXEC:  parseInt('0100', 8),  // execute/search by owner
	  TGREAD:  parseInt('0040', 8),  // read by group
	  TGWRITE: parseInt('0020', 8),  // write by group
	  TGEXEC:  parseInt('0010', 8),  // execute/search by group
	  TOREAD:  parseInt('0004', 8),  // read by other
	  TOWRITE: parseInt('0002', 8),  // write by other
	  TOEXEC:  parseInt('0001', 8),   // execute/search by other
	
	  TPERMALL:  parseInt('0777', 8),   // rwxrwxrwx
	  TPERMMASK: parseInt('0777', 8)    // permissions bitmask
	
	  /* eslint-enable key-spacing */
	};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';
	
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	var undefined = (function(undefined) {
	  return undefined;
	})();
	
	function isUndefined(value) {
	  return value === undefined;
	}
	
	function isString(value) {
	  return (typeof value == 'string') ||
	    (Object.prototype.toString.call(value) == '[object String]');
	}
	
	function isDateTime(value) {
	  return (Object.prototype.toString.call(value) == '[object Date]');
	}
	
	function isObject(value) {
	  return (value !== null) && (typeof value == 'object');
	}
	
	function isFunction(value) {
	  return typeof value == 'function';
	}
	
	function isLength(value) {
	  return (typeof value == 'number') &&
	    (value > -1) && (value % 1 == 0) &&
	    (value <= MAX_SAFE_INTEGER);
	}
	
	function isArray(value) {
	  return Object.prototype.toString.call(value) == '[object Array]';
	}
	
	function isArrayLike(value) {
	  return isObject(value) && !isFunction(value) && isLength(value.length);
	}
	
	function isArrayBuffer(value) {
	  return Object.prototype.toString.call(value) == '[object ArrayBuffer]';
	}
	
	function map(array, iteratee) {
	  return Array.prototype.map.call(array, iteratee);
	}
	
	function find(array, iteratee) {
	  var result = undefined;
	
	  if (isFunction(iteratee)) {
	    Array.prototype.every.call(array, function(item, index, array) {
	      var found = iteratee(item, index, array);
	      if (found) {
	        result = item;
	      }
	      return !found;  // continue if not found
	    });
	  }
	
	  return result;
	}
	
	function extend(target /* ...sources */) {
	  return Object.assign.apply(null, arguments);
	}
	
	function toUint8Array(value) {
	  var i;
	  var length;
	  var result;
	
	  if (isString(value)) {
	    length = value.length;
	    result = new Uint8Array(length);
	    for (i = 0; i < length; i++) {
	      result[i] = value.charCodeAt(i) & 0xFF;
	    }
	    return result;
	  }
	
	  if (isArrayBuffer(value)) {
	    return new Uint8Array(value);
	  }
	
	  if (isObject(value) && isArrayBuffer(value.buffer)) {
	    return new Uint8Array(value.buffer);
	  }
	
	  if (isArrayLike(value)) {
	    return new Uint8Array(value);
	  }
	
	  if (isObject(value) && isFunction(value.toString)) {
	    return toUint8Array(value.toString());
	  }
	
	  return new Uint8Array();
	}
	
	module.exports.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
	
	module.exports.isUndefined = isUndefined;
	module.exports.isString = isString;
	module.exports.isObject = isObject;
	module.exports.isDateTime = isDateTime;
	module.exports.isFunction = isFunction;
	module.exports.isArray = isArray;
	module.exports.isArrayLike = isArrayLike;
	module.exports.isArrayBuffer = isArrayBuffer;
	module.exports.map = map;
	module.exports.find = find;
	module.exports.extend = extend;
	module.exports.toUint8Array = toUint8Array;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(2);
	var constants = __webpack_require__(1);
	
	var recordSize = 512;
	var defaultFileMode = constants.TPERMALL;  // rwxrwxrwx
	var defaultUid = 0;  // root
	var defaultGid = 0;  // root
	
	/*
	 struct posix_header {           // byte offset
	 char name[100];               //   0
	 char mode[8];                 // 100
	 char uid[8];                  // 108
	 char gid[8];                  // 116
	 char size[12];                // 124
	 char mtime[12];               // 136
	 char chksum[8];               // 148
	 char typeflag;                // 156
	 char linkname[100];           // 157
	 char magic[6];                // 257
	 char version[2];              // 263
	 char uname[32];               // 265
	 char gname[32];               // 297
	 char devmajor[8];             // 329
	 char devminor[8];             // 337
	 char prefix[131];             // 345
	 char atime[12];               // 476
	 char ctime[12];               // 488
	 };
	 */
	
	var posixHeader = [
	  // <field name>, <size>, <offset>, <used>, <format>, <parse>, [ <check> ]
	  ['name', 100, 0, function(file, field) {
	    return formatTarString(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarString(buffer.slice(offset, offset + field[1]));
	  }],
	  ['mode', 8, 100, function(file, field) {
	    var mode = file[field[0]] || defaultFileMode;
	    mode = mode & constants.TPERMMASK;
	    return formatTarNumber(mode, field[1], defaultFileMode);
	  }, function(buffer, offset, field) {
	    var result = parseTarNumber(buffer.slice(offset, offset + field[1]));
	    result &= constants.TPERMMASK;
	    return result;
	  }],
	  ['uid', 8, 108, function(file, field) {
	    return formatTarNumber(file[field[0]], field[1], defaultUid);
	  }, function(buffer, offset, field) {
	    return parseTarNumber(buffer.slice(offset, offset + field[1]));
	  }],
	  ['gid', 8, 116, function(file, field) {
	    return formatTarNumber(file[field[0]], field[1], defaultGid);
	  }, function(buffer, offset, field) {
	    return parseTarNumber(buffer.slice(offset, offset + field[1]));
	  }],
	  ['size', 12, 124, function(file, field) {
	    return formatTarNumber(file.data.length, field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarNumber(buffer.slice(offset, offset + field[1]));
	  }],
	  ['modifyTime', 12, 136, function(file, field) {
	    return formatTarDateTime(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarDateTime(buffer.slice(offset, offset + field[1]));
	  }],
	  ['checksum', 8, 148, function(file, field) {
	    return '        ';  // placeholder
	  }, function(buffer, offset, field) {
	    return parseTarNumber(buffer.slice(offset, offset + field[1]));
	  }],
	  ['type', 1, 156, function(file, field) {
	    // get last octal digit; 0 - regular file
	    return '' + ((parseInt(file[field[0]], 10) || 0) % 8);
	  }, function(buffer, offset, field) {
	    return (parseInt(String.fromCharCode(buffer[offset]), 10) || 0) % 8;
	  }],
	  ['linkName', 100, 157, function(file, field) {
	    return '';  // only regular files are supported
	  }, function(buffer, offset, field) {
	    return parseTarString(buffer.slice(offset, offset + field[1]));
	  }],
	  ['ustar', 8, 257, function(file, field) {
	    return constants.TMAGIC;  // magic + version
	  }, function(buffer, offset, field) {
	    return fixUstarMagic(
	      parseTarString(buffer.slice(offset, offset + field[1]), true)
	    );
	  }, function(file, field) {
	    return (file[field[0]] == constants.TMAGIC) ||
	      (file[field[0]] == constants.OLDGNU_MAGIC);
	  }],
	  ['owner', 32, 265, function(file, field) {
	    return formatTarString(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarString(buffer.slice(offset, offset + field[1]));
	  }],
	  ['group', 32, 297, function(file, field) {
	    return formatTarString(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarString(buffer.slice(offset, offset + field[1]));
	  }],
	  ['majorNumber', 8, 329, function(file, field) {
	    return '';  // only regular files are supported
	  }, function(buffer, offset, field) {
	    return parseTarNumber(buffer.slice(offset, offset + field[1]));
	  }],
	  ['minorNumber', 8, 337, function(file, field) {
	    return '';  // only regular files are supported
	  }, function(buffer, offset, field) {
	    return parseTarNumber(buffer.slice(offset, offset + field[1]));
	  }],
	  ['prefix', 131, 345, function(file, field) {
	    return formatTarString(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarString(buffer.slice(offset, offset + field[1]));
	  }],
	  ['accessTime', 12, 476, function(file, field) {
	    return formatTarDateTime(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarDateTime(buffer.slice(offset, offset + field[1]));
	  }],
	  ['createTime', 12, 488, function(file, field) {
	    return formatTarDateTime(file[field[0]], field[1]);
	  }, function(buffer, offset, field) {
	    return parseTarDateTime(buffer.slice(offset, offset + field[1]));
	  }]
	];
	
	var effectiveHeaderSize = (function(header) {
	  var last = header[header.length - 1];
	  return last[2] + last[1];  // offset + size
	})(posixHeader);
	
	function fixUstarMagic(value) {
	  if (value.length == 8) {
	    var chars = value.split('');
	
	    if (chars[5] == constants.NULL_CHAR) {
	      // TMAGIC ?
	      if ((chars[6] == ' ') || (chars[6] == constants.NULL_CHAR)) {
	        chars[6] = '0';
	      }
	      if ((chars[7] == ' ') || (chars[7] == constants.NULL_CHAR)) {
	        chars[7] = '0';
	      }
	      chars = chars.join('');
	      return chars == constants.TMAGIC ? chars : value;
	    } else if (chars[7] == constants.NULL_CHAR) {
	      // OLDGNU_MAGIC ?
	      if (chars[5] == constants.NULL_CHAR) {
	        chars[5] = ' ';
	      }
	      if (chars[6] == constants.NULL_CHAR) {
	        chars[6] = ' ';
	      }
	      return chars == constants.OLDGNU_MAGIC ? chars : value;
	    }
	  }
	  return value;
	}
	
	function formatTarString(value, length) {
	  length -= 1;  // preserve space for trailing null-char
	  if (utils.isUndefined(value)) {
	    value = '';
	  }
	  value = ('' + value).substr(0, length);
	  return value + constants.NULL_CHAR;
	}
	
	function formatTarNumber(value, length, defaultValue) {
	  defaultValue = parseInt(defaultValue) || 0;
	  length -= 1;  // preserve space for trailing null-char
	  value = (parseInt(value) || defaultValue)
	    .toString(8).substr(-length, length);
	  while (value.length < length) {
	    value = '0' + value;
	  }
	  return value + constants.NULL_CHAR;
	}
	
	function formatTarDateTime(value, length) {
	  if (utils.isDateTime(value)) {
	    value = Math.floor(1 * value / 1000);
	  } else {
	    value = parseInt(value, 10);
	    if (isFinite(value)) {
	      if (value <= 0) {
	        return '';
	      }
	    } else {
	      value = Math.floor(1 * new Date() / 1000);
	    }
	  }
	  return formatTarNumber(value, length, 0);
	}
	
	function parseTarString(bytes, returnUnprocessed) {
	  var result = String.fromCharCode.apply(null, bytes);
	  if (returnUnprocessed) {
	    return result;
	  }
	  var index = result.indexOf(constants.NULL_CHAR);
	  return index >= 0 ? result.substr(0, index) : result;
	}
	
	function parseTarNumber(bytes) {
	  var result = String.fromCharCode.apply(null, bytes);
	  return parseInt(result.replace(/^0+$/g, ''), 8) || 0;
	}
	
	function parseTarDateTime(bytes) {
	  if ((bytes.length == 0) || (bytes[0] == 0)) {
	    return null;
	  }
	  return new Date(1000 * parseTarNumber(bytes));
	}
	
	function calculateChecksum(buffer, offset, skipChecksum) {
	  var from = parseInt(offset, 10) || 0;
	  var to = Math.min(from + effectiveHeaderSize, buffer.length);
	  var result = 0;
	
	  // When calculating checksum, `checksum` field should be
	  // threat as filled with space char (byte 32)
	  var skipFrom = 0;
	  var skipTo = 0;
	  if (skipChecksum) {
	    posixHeader.every(function(field) {
	      if (field[0] == 'checksum') {
	        skipFrom = from + field[2];
	        skipTo = skipFrom + field[1];
	        return false;
	      }
	      return true;
	    });
	  }
	
	  var whitespace = ' '.charCodeAt(0);
	  for (var i = from; i < to; i++) {
	    // 262144 = 8^6 - 6 octal digits - maximum possible value for checksum;
	    // wrap to avoid numeric overflow
	    var byte = (i >= skipFrom) && (i < skipTo) ? whitespace : buffer[i];
	    result = (result + byte) % 262144;
	  }
	  return result;
	}
	
	module.exports.recordSize = recordSize;
	module.exports.defaultFileMode = defaultFileMode;
	module.exports.defaultUid = defaultUid;
	module.exports.defaultGid = defaultGid;
	module.exports.posixHeader = posixHeader;
	module.exports.effectiveHeaderSize = effectiveHeaderSize;
	
	module.exports.calculateChecksum = calculateChecksum;
	module.exports.formatTarString = formatTarString;
	module.exports.formatTarNumber = formatTarNumber;
	module.exports.formatTarDateTime = formatTarDateTime;
	module.exports.parseTarString = parseTarString;
	module.exports.parseTarNumber = parseTarNumber;
	module.exports.parseTarDateTime = parseTarDateTime;
	


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var constants = __webpack_require__(1);
	var utils = __webpack_require__(2);
	var types = __webpack_require__(3);
	
	function headerSize(file) {
	  // header has fixed size
	  return types.recordSize;
	}
	
	function dataSize(file) {
	  // align to record boundary
	  return Math.ceil(file.data.length / types.recordSize) * types.recordSize;
	}
	
	function allocateBuffer(files) {
	  var totalSize = 0;
	
	  // Calculate space that will be used by each file
	  files.forEach(function(file) {
	    totalSize += headerSize(file) + dataSize(file);
	  });
	
	  // TAR must end with two empty records
	  totalSize += types.recordSize * 2;
	
	  // Array SHOULD be initialized with zeros:
	  // from TypedArray constructor docs:
	  // > When creating a TypedArray instance (i.e. instance of Int8Array
	  // > or similar), an array buffer is created internally
	  // from ArrayBuffer constructor docs:
	  // > A new ArrayBuffer object of the specified size.
	  // > Its contents are initialized to 0.
	  return new Uint8Array(totalSize);
	}
	
	function writeHeader(buffer, file, offset) {
	  offset = parseInt(offset) || 0;
	
	  var currentOffset = offset;
	  types.posixHeader.forEach(function(field) {
	    var value = field[3](file, field);
	    var length = value.length;
	    for (var i = 0; i < length; i += 1) {
	      buffer[currentOffset + i] = value.charCodeAt(i) & 0xFF;
	    }
	    currentOffset += field[1];  // move to the next field
	  });
	
	  var field = utils.find(types.posixHeader, function(field) {
	    return field[0] == 'checksum';
	  });
	
	  if (field) {
	    // Patch checksum field
	    var checksum = types.calculateChecksum(buffer, offset, true);
	    var value = types.formatTarNumber(checksum, field[1] - 2) +
	      constants.NULL_CHAR + ' ';
	    currentOffset = offset + field[2];
	    for (var i = 0; i < value.length; i += 1) {
	      // put bytes
	      buffer[currentOffset] = value.charCodeAt(i) & 0xFF;
	      currentOffset++;
	    }
	  }
	
	  return offset + headerSize(file);
	}
	
	function writeData(buffer, file, offset) {
	  offset = parseInt(offset, 10) || 0;
	  buffer.set(file.data, offset);
	  return offset + dataSize(file);
	}
	
	function tar(files) {
	  files = utils.map(files, function(file) {
	    return utils.extend({}, file, {
	      data: utils.toUint8Array(file.data)
	    });
	  });
	
	  var buffer = allocateBuffer(files);
	
	  var offset = 0;
	  files.forEach(function(file) {
	    offset = writeHeader(buffer, file, offset);
	    offset = writeData(buffer, file, offset);
	  });
	
	  return buffer;
	}
	
	module.exports.tar = tar;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var constants = __webpack_require__(1);
	var utils = __webpack_require__(2);
	var types = __webpack_require__(3);
	
	var defaultOptions = {
	  extractData: true,
	  checkHeader: true,
	  checkChecksum: true,
	  checkFileSize: true
	};
	
	var excludeFields = {
	  size: true,
	  checksum: true,
	  ustar: true
	};
	
	var messages = {
	  unexpectedEndOfFile: 'Unexpected end of file.',
	  fileCorrupted: 'File is corrupted.',
	  checksumCheckFailed: 'Checksum check failed.'
	};
	
	function headerSize(header) {
	  // header has fixed size
	  return types.recordSize;
	}
	
	function dataSize(size) {
	  // align to record boundary
	  return Math.ceil(size / types.recordSize) * types.recordSize;
	}
	
	function isEndOfFile(buffer, offset) {
	  var from = offset;
	  var to = Math.min(buffer.length, offset + types.recordSize * 2);
	  for (var i = from; i < to; i++) {
	    if (buffer[i] != 0) {
	      return false;
	    }
	  }
	  return true;
	}
	
	function readHeader(buffer, offset, options) {
	  if (buffer.length - offset < types.recordSize) {
	    if (options.checkFileSize) {
	      throw new Error(messages.unexpectedEndOfFile);
	    }
	    return null;
	  }
	
	  offset = parseInt(offset) || 0;
	
	  var result = {};
	  var currentOffset = offset;
	  types.posixHeader.forEach(function(field) {
	    result[field[0]] = field[4](buffer, currentOffset, field);
	    currentOffset += field[1];
	  });
	
	  if (result.type != 0) {  // only regular files can have data
	    result.size = 0;
	  }
	
	  if (options.checkHeader) {
	    types.posixHeader.forEach(function(field) {
	      if (utils.isFunction(field[5]) && !field[5](result, field)) {
	        var error = new Error(messages.fileCorrupted);
	        error.data = {
	          offset: offset + field[2],
	          field: field[0]
	        };
	        throw error;
	      }
	    });
	  }
	
	  if (options.checkChecksum) {
	    var checksum = types.calculateChecksum(buffer, offset, true);
	    if (checksum != result.checksum) {
	      var error = new Error(messages.checksumCheckFailed);
	      error.data = {
	        offset: offset,
	        header: result,
	        checksum: checksum
	      };
	      throw error;
	    }
	  }
	
	  return result;
	}
	
	function readData(buffer, offset, header, options) {
	  if (!options.extractData) {
	    return null;
	  }
	
	  if (header.size <= 0) {
	    return new Uint8Array();
	  }
	  return buffer.slice(offset, offset + header.size);
	}
	
	function createFile(header, data) {
	  var result = {};
	  types.posixHeader.forEach(function(field) {
	    var name = field[0];
	    if (!excludeFields[name]) {
	      result[name] = header[name];
	    }
	  });
	
	  result.isOldGNUFormat = header.ustar == constants.OLDGNU_MAGIC;
	
	  if (data) {
	    result.data = data;
	  }
	
	  return result;
	}
	
	function untar(buffer, options) {
	  options = utils.extend({}, defaultOptions, options);
	
	  var result = [];
	  var offset = 0;
	  var size = buffer.length;
	
	  while (size - offset >= types.recordSize) {
	    buffer = utils.toUint8Array(buffer);
	    var header = readHeader(buffer, offset, options);
	    if (!header) {
	      break;
	    }
	    offset += headerSize(header);
	
	    var data = readData(buffer, offset, header, options);
	    result.push(createFile(header, data));
	    offset += dataSize(header.size);
	
	    if (isEndOfFile(buffer, offset)) {
	      break;
	    }
	  }
	
	  return result;
	}
	
	module.exports.untar = untar;


/***/ })
/******/ ])
});
;
//# sourceMappingURL=tinytar.js.map