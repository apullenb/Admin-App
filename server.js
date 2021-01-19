/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server/server.dev.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./data/knex.js":
/*!**********************!*\
  !*** ./data/knex.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var environment = \"development\" || false;\n\nvar config = __webpack_require__(/*! ../knexfile */ \"./knexfile.js\")[environment];\n\nvar knex = __webpack_require__(/*! knex */ \"knex\");\n\nmodule.exports = knex(config);\n\n//# sourceURL=webpack:///./data/knex.js?");

/***/ }),

/***/ "./knexfile.js":
/*!*********************!*\
  !*** ./knexfile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// Update with your config settings.\n__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nmodule.exports = {\n  development: {\n    client: 'sqlite3',\n    connection: {\n      filename: './dev.sqlite3'\n    },\n    useNullAsDefault: true,\n    pool: {\n      min: 2,\n      max: 10\n    },\n    migrations: {\n      directory: \"./data/migrations\"\n    },\n    seeds: {\n      directory: \"./data/seeds\"\n    }\n  },\n  staging: {\n    client: 'postgresql',\n    connection: {\n      database: 'my_db',\n      user: 'username',\n      password: 'password'\n    },\n    pool: {\n      min: 2,\n      max: 10\n    },\n    migrations: {\n      tableName: 'knex_migrations'\n    }\n  },\n  production: {\n    client: 'mssql',\n    connection: {\n      server: process.env.AZUREDBURL,\n      user: process.env.AZUREPRODUCTIONUSERNAME,\n      password: process.env.AZUREPRODUCTIONPASSWORD,\n      database: process.env.AZUREPRODUCTIONDATABASE,\n      options: {\n        port: 1433,\n        encrypt: true // mandatory for microsoft azure sql server\n\n      }\n    },\n    pool: {\n      min: 2,\n      max: 10\n    },\n    migrations: {\n      directory: \"./data/migrations\"\n    },\n    seeds: {\n      directory: \"./data/seeds\"\n    }\n  }\n};\n\n//# sourceURL=webpack:///./knexfile.js?");

/***/ }),

/***/ "./routes/categories/categoriesDBHelper.js":
/*!*************************************************!*\
  !*** ./routes/categories/categoriesDBHelper.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var db = __webpack_require__(/*! ../../data/knex */ \"./data/knex.js\"); //GET\n//GET ALL CATEGORIES\n\n\nvar getAllCategories = function getAllCategories() {\n  return db('product_categories').select('*');\n};\n\nvar getCategoryByName = function getCategoryByName(categoryName) {\n  return db('product_categories as pc').where('pc.category_name', '=', categoryName).select('*');\n}; //POST\n\n\nvar addCategory = function addCategory(category) {\n  return db('product_categories').insert(category);\n}; //PUT\n\n\nvar updateCategoryByName = function updateCategoryByName(categoryName, data) {\n  return db('product_categories as pc').where('pc.category_name', '=', categoryName).update(data);\n}; //DELETE\n\n\nvar deleteCategory = function deleteCategory(categoryName) {\n  return db('product_categories as pc').where('pc.category_name', '=', categoryName).del();\n};\n\nmodule.exports = {\n  getAllCategories: getAllCategories,\n  getCategoryByName: getCategoryByName,\n  addCategory: addCategory,\n  updateCategoryByName: updateCategoryByName,\n  deleteCategory: deleteCategory\n};\n\n//# sourceURL=webpack:///./routes/categories/categoriesDBHelper.js?");

/***/ }),

/***/ "./routes/categories/categoriesRouter.js":
/*!***********************************************!*\
  !*** ./routes/categories/categoriesRouter.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar db = __webpack_require__(/*! ./categoriesDBHelper */ \"./routes/categories/categoriesDBHelper.js\");\n\nvar protectedDelete = process.env.DELETEPASSWORD; //GET\n//GET ALL CATEGORIES\n\nrouter.get(\"/\", /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n    var data, message;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return db.getAllCategories();\n\n          case 3:\n            data = _context.sent;\n            res.status(200).json(data);\n            _context.next = 11;\n            break;\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](0);\n            message = _context.t0.message;\n            res.status(500).json(message);\n\n          case 11:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 7]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}());\nrouter.get(\"/:categoryName\", /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n    var categoryName, data, message;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            categoryName = req.params.categoryName;\n            _context2.prev = 1;\n            _context2.next = 4;\n            return db.getCategoryByName(categoryName);\n\n          case 4:\n            data = _context2.sent;\n            res.status(200).json(data);\n            _context2.next = 12;\n            break;\n\n          case 8:\n            _context2.prev = 8;\n            _context2.t0 = _context2[\"catch\"](1);\n            message = _context2.t0.message;\n            res.status(500).json(message);\n\n          case 12:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[1, 8]]);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref3.apply(this, arguments);\n  };\n}()); //POST\n\nrouter.post(\"/\", /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n    var category, data, message;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            category = req.body;\n            _context3.prev = 1;\n            _context3.next = 4;\n            return db.addCategory(category);\n\n          case 4:\n            data = _context3.sent;\n            res.status(201).json(data);\n            _context3.next = 12;\n            break;\n\n          case 8:\n            _context3.prev = 8;\n            _context3.t0 = _context3[\"catch\"](1);\n            message = _context3.t0.message;\n            res.status(500).json(message);\n\n          case 12:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[1, 8]]);\n  }));\n\n  return function (_x5, _x6) {\n    return _ref5.apply(this, arguments);\n  };\n}()); //PUT\n\nrouter.put(\"/:categoryName\", /*#__PURE__*/function () {\n  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {\n    var categoryName, updatedCategory, data, message;\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            categoryName = req.params.categoryName;\n            updatedCategory = req.body;\n            _context4.prev = 2;\n            _context4.next = 5;\n            return db.updateCategoryByName(categoryName, updatedCategory);\n\n          case 5:\n            data = _context4.sent;\n            res.status(200).json(data);\n            _context4.next = 13;\n            break;\n\n          case 9:\n            _context4.prev = 9;\n            _context4.t0 = _context4[\"catch\"](2);\n            message = _context4.t0.message;\n            res.status(500).json(message);\n\n          case 13:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4, null, [[2, 9]]);\n  }));\n\n  return function (_x7, _x8) {\n    return _ref7.apply(this, arguments);\n  };\n}()); //DELETE\n\nrouter[\"delete\"](\"/:categoryName/:password\", /*#__PURE__*/function () {\n  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {\n    var _req$params, categoryName, password, data, message;\n\n    return regeneratorRuntime.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            _req$params = req.params, categoryName = _req$params.categoryName, password = _req$params.password;\n\n            if (!(password === protectedDelete)) {\n              _context5.next = 15;\n              break;\n            }\n\n            _context5.prev = 2;\n            _context5.next = 5;\n            return db.deleteCategory(categoryName);\n\n          case 5:\n            data = _context5.sent;\n            res.status(204).json(data);\n            _context5.next = 13;\n            break;\n\n          case 9:\n            _context5.prev = 9;\n            _context5.t0 = _context5[\"catch\"](2);\n            message = _context5.t0.message;\n            res.status(500).json(message);\n\n          case 13:\n            _context5.next = 16;\n            break;\n\n          case 15:\n            res.status(401).json({\n              error: \"You are not authorized to delete this product.\"\n            });\n\n          case 16:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5, null, [[2, 9]]);\n  }));\n\n  return function (_x9, _x10) {\n    return _ref9.apply(this, arguments);\n  };\n}());\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/categories/categoriesRouter.js?");

/***/ }),

/***/ "./routes/products/productsDBHelper.js":
/*!*********************************************!*\
  !*** ./routes/products/productsDBHelper.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var db = __webpack_require__(/*! ../../data/knex */ \"./data/knex.js\"); //READ\n//GET ALL PRODUCTS\n\n\nvar getAllProducts = function getAllProducts() {\n  return db(\"products as p\").join(\"product_categories as pc\", \"p.fk_category\", \"=\", \"pc.id\").select(\"p.id\", \"p.sku\", \"p.description\", \"pc.category_name\", \"p.fk_category\", \"p.weight\", \"p.image_one_link\", \"p.image_two_link\", \"p.video_one_link\", \"p.video_two_link\", \"p.link_one\", \"p.link_two\", \"p.json-data\", \"p.created_at\", \"p.sort_rank\").orderBy(\"p.sku\");\n}; //GET PRODUCTS BY CATEGORY\n\n\nvar getProductsByCategory = function getProductsByCategory(category) {\n  return db(\"products as p\").join(\"product_categories as pc\", \"p.fk_category\", \"=\", \"pc.id\").where(\"pc.category_name\", \"=\", category).select(\"*\");\n}; //GET PRODUCTS BY SKU\n\n\nvar getProductsBySKU = function getProductsBySKU(sku) {\n  return db(\"products as p\").join(\"product_categories as pc\", \"p.fk_category\", \"=\", \"pc.id\").where(\"p.sku\", \"=\", sku).select(\"*\");\n};\n\nvar getProductsSorted = function getProductsSorted() {\n  return db(\"products as p\").join(\"product_categories as pc\", \"p.fk_category\", \"=\", \"pc.id\").select(\"p.id\", \"p.sku\", \"p.description\", \"pc.category_name\", \"p.fk_category\", \"p.weight\", \"p.image_one_link\", \"p.image_two_link\", \"p.video_one_link\", \"p.video_two_link\", \"p.link_one\", \"p.link_two\", \"p.json-data\", \"p.created_at\", \"p.sort_rank\").orderBy(\"p.sort_rank\", \"asc\");\n}; //CREATE\n//CREATE A PRODUCT\n\n\nvar addProduct = function addProduct(product) {\n  return db(\"products\").insert(product);\n}; //UPDATE\n//UPDATE PRODUCT BY SKU\n\n\nvar updateProductBySKU = function updateProductBySKU(sku, data) {\n  return db(\"products\").where(\"sku\", \"=\", sku).update(data, [\"sku\"]);\n}; //UPDATE PRODUCT BY ID\n\n\nvar updateProductByID = function updateProductByID(id, data) {\n  return db(\"products\").where(\"id\", \"=\", id).update(data, [\"id\"]);\n}; //DELETE\n\n\nvar deleteProdcustbySKU = function deleteProdcustbySKU(sku) {\n  return db(\"products\").where(\"sku\", \"=\", sku).del();\n};\n\nmodule.exports = {\n  getAllProducts: getAllProducts,\n  getProductsByCategory: getProductsByCategory,\n  getProductsBySKU: getProductsBySKU,\n  getProductsSorted: getProductsSorted,\n  addProduct: addProduct,\n  updateProductByID: updateProductByID,\n  updateProductBySKU: updateProductBySKU,\n  deleteProdcustbySKU: deleteProdcustbySKU\n};\n\n//# sourceURL=webpack:///./routes/products/productsDBHelper.js?");

/***/ }),

/***/ "./routes/products/productsRouter.js":
/*!*******************************************!*\
  !*** ./routes/products/productsRouter.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar router = express.Router();\n\nvar db = __webpack_require__(/*! ./productsDBHelper */ \"./routes/products/productsDBHelper.js\");\n\nvar protectedDelete = process.env.DELETEPASSWORD; //Get\n//GET ALL PRODUCTS\n\nrouter.get(\"/\", /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {\n    var data, message;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return db.getAllProducts();\n\n          case 3:\n            data = _context.sent;\n            res.status(200).json(data);\n            _context.next = 11;\n            break;\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](0);\n            message = _context.t0.message;\n            res.status(500).json(message);\n\n          case 11:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, null, [[0, 7]]);\n  }));\n\n  return function (_x, _x2) {\n    return _ref.apply(this, arguments);\n  };\n}()); // GET PRODUCTS BY CATEGORY NAME\n\nrouter.get(\"/by-category/:category\", /*#__PURE__*/function () {\n  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {\n    var category, data, message;\n    return regeneratorRuntime.wrap(function _callee2$(_context2) {\n      while (1) {\n        switch (_context2.prev = _context2.next) {\n          case 0:\n            category = req.params.category;\n            _context2.prev = 1;\n            _context2.next = 4;\n            return db.getProductsByCategory(category);\n\n          case 4:\n            data = _context2.sent;\n            res.status(200).json(data);\n            _context2.next = 12;\n            break;\n\n          case 8:\n            _context2.prev = 8;\n            _context2.t0 = _context2[\"catch\"](1);\n            message = _context2.t0.message;\n            res.status(500).json(message);\n\n          case 12:\n          case \"end\":\n            return _context2.stop();\n        }\n      }\n    }, _callee2, null, [[1, 8]]);\n  }));\n\n  return function (_x3, _x4) {\n    return _ref3.apply(this, arguments);\n  };\n}()); //GET PRODUCTS BY SKU\n\nrouter.get(\"/by-sku/:sku\", /*#__PURE__*/function () {\n  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {\n    var sku, data, message;\n    return regeneratorRuntime.wrap(function _callee3$(_context3) {\n      while (1) {\n        switch (_context3.prev = _context3.next) {\n          case 0:\n            sku = req.params.sku;\n            _context3.prev = 1;\n            _context3.next = 4;\n            return db.getProductsBySKU(sku);\n\n          case 4:\n            data = _context3.sent;\n            res.status(200).json(data);\n            _context3.next = 12;\n            break;\n\n          case 8:\n            _context3.prev = 8;\n            _context3.t0 = _context3[\"catch\"](1);\n            message = _context3.t0.message;\n            res.status(500).json(message);\n\n          case 12:\n          case \"end\":\n            return _context3.stop();\n        }\n      }\n    }, _callee3, null, [[1, 8]]);\n  }));\n\n  return function (_x5, _x6) {\n    return _ref5.apply(this, arguments);\n  };\n}());\nrouter.get('/sort-order', /*#__PURE__*/function () {\n  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {\n    var message;\n    return regeneratorRuntime.wrap(function _callee4$(_context4) {\n      while (1) {\n        switch (_context4.prev = _context4.next) {\n          case 0:\n            _context4.prev = 0;\n            _context4.next = 3;\n            return db.getProductsSorted();\n\n          case 3:\n            sortedProducts = _context4.sent;\n            res.status(200).json(sortedProducts);\n            _context4.next = 11;\n            break;\n\n          case 7:\n            _context4.prev = 7;\n            _context4.t0 = _context4[\"catch\"](0);\n            message = _context4.t0.message;\n            res.status(500).json(message);\n\n          case 11:\n          case \"end\":\n            return _context4.stop();\n        }\n      }\n    }, _callee4, null, [[0, 7]]);\n  }));\n\n  return function (_x7, _x8) {\n    return _ref7.apply(this, arguments);\n  };\n}()); //Post\n\nrouter.post(\"/\", /*#__PURE__*/function () {\n  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {\n    var product, addedProduct, message;\n    return regeneratorRuntime.wrap(function _callee5$(_context5) {\n      while (1) {\n        switch (_context5.prev = _context5.next) {\n          case 0:\n            product = req.body;\n            _context5.prev = 1;\n            _context5.next = 4;\n            return db.addProduct(product);\n\n          case 4:\n            addedProduct = _context5.sent;\n            res.status(201).json(addedProduct);\n            _context5.next = 12;\n            break;\n\n          case 8:\n            _context5.prev = 8;\n            _context5.t0 = _context5[\"catch\"](1);\n            message = _context5.t0.message;\n            res.status(500).json(message);\n\n          case 12:\n          case \"end\":\n            return _context5.stop();\n        }\n      }\n    }, _callee5, null, [[1, 8]]);\n  }));\n\n  return function (_x9, _x10) {\n    return _ref9.apply(this, arguments);\n  };\n}()); //Put\n\nrouter.put(\"/update-product/by-sku/:sku\", /*#__PURE__*/function () {\n  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {\n    var sku, data, updatedProduct, message;\n    return regeneratorRuntime.wrap(function _callee6$(_context6) {\n      while (1) {\n        switch (_context6.prev = _context6.next) {\n          case 0:\n            sku = req.params.sku;\n            data = req.body;\n            _context6.prev = 2;\n            _context6.next = 5;\n            return db.updateProductBySKU(sku, data);\n\n          case 5:\n            updatedProduct = _context6.sent;\n            res.status(200).json(updatedProduct);\n            _context6.next = 13;\n            break;\n\n          case 9:\n            _context6.prev = 9;\n            _context6.t0 = _context6[\"catch\"](2);\n            message = _context6.t0.message;\n            res.status(500).json(message);\n\n          case 13:\n          case \"end\":\n            return _context6.stop();\n        }\n      }\n    }, _callee6, null, [[2, 9]]);\n  }));\n\n  return function (_x11, _x12) {\n    return _ref11.apply(this, arguments);\n  };\n}()); //Update Product by id\n\nrouter.put(\"/update-product/by-id/:id\", /*#__PURE__*/function () {\n  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {\n    var id, data, updatedProduct, message;\n    return regeneratorRuntime.wrap(function _callee7$(_context7) {\n      while (1) {\n        switch (_context7.prev = _context7.next) {\n          case 0:\n            id = req.params.id;\n            data = req.body;\n            delete data.id; // Delete the id \n\n            _context7.prev = 3;\n            _context7.next = 6;\n            return db.updateProductByID(id, data);\n\n          case 6:\n            updatedProduct = _context7.sent;\n            res.status(200).json(updatedProduct);\n            _context7.next = 14;\n            break;\n\n          case 10:\n            _context7.prev = 10;\n            _context7.t0 = _context7[\"catch\"](3);\n            message = _context7.t0.message;\n            res.status(500).json(message);\n\n          case 14:\n          case \"end\":\n            return _context7.stop();\n        }\n      }\n    }, _callee7, null, [[3, 10]]);\n  }));\n\n  return function (_x13, _x14) {\n    return _ref13.apply(this, arguments);\n  };\n}()); //Delete\n\nrouter[\"delete\"](\"/delete-product/by-sku/:sku/:password\", /*#__PURE__*/function () {\n  var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {\n    var _req$params, sku, password, deletedProduct, message;\n\n    return regeneratorRuntime.wrap(function _callee8$(_context8) {\n      while (1) {\n        switch (_context8.prev = _context8.next) {\n          case 0:\n            _req$params = req.params, sku = _req$params.sku, password = _req$params.password;\n\n            if (!(password === protectedDelete)) {\n              _context8.next = 15;\n              break;\n            }\n\n            _context8.prev = 2;\n            _context8.next = 5;\n            return db.deleteProdcustbySKU(sku);\n\n          case 5:\n            deletedProduct = _context8.sent;\n            res.status(204).json(deletedProduct);\n            _context8.next = 13;\n            break;\n\n          case 9:\n            _context8.prev = 9;\n            _context8.t0 = _context8[\"catch\"](2);\n            message = _context8.t0.message;\n            res.status(500).json(message);\n\n          case 13:\n            _context8.next = 16;\n            break;\n\n          case 15:\n            res.status(401).json({\n              message: \"You are not authorized to delete this product.\"\n            });\n\n          case 16:\n          case \"end\":\n            return _context8.stop();\n        }\n      }\n    }, _callee8, null, [[2, 9]]);\n  }));\n\n  return function (_x15, _x16) {\n    return _ref15.apply(this, arguments);\n  };\n}());\nmodule.exports = router;\n\n//# sourceURL=webpack:///./routes/products/productsRouter.js?");

/***/ }),

/***/ "./src/server/server.dev.js":
/*!**********************************!*\
  !*** ./src/server/server.dev.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! dotenv */ \"dotenv\").config();\n\nvar express = __webpack_require__(/*! express */ \"express\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\n\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\n\nvar swaggerUi = __webpack_require__(/*! swagger-ui-express */ \"swagger-ui-express\");\n\nvar swaggerDocument = __webpack_require__(/*! ../../swagger.json */ \"./swagger.json\");\n\nvar config = __webpack_require__(/*! ../../webpack.dev.config.js */ \"./webpack.dev.config.js\");\n\nvar DIST_DIR = __dirname,\n    HTML_FILE = path.join(DIST_DIR, './index.html'); //Middleware Setup\n\nvar cors = __webpack_require__(/*! cors */ \"cors\");\n\nvar helmet = __webpack_require__(/*! helmet */ \"helmet\");\n\nvar morgan = __webpack_require__(/*! morgan */ \"morgan\");\n\nvar server = express(); //Routes setup\n\nvar productsRouter = __webpack_require__(/*! ../../routes/products/productsRouter */ \"./routes/products/productsRouter.js\");\n\nvar categoriesRouter = __webpack_require__(/*! ../../routes/categories/categoriesRouter */ \"./routes/categories/categoriesRouter.js\"); //Middleware Use\n\n\nvar compiler = webpack(config);\nserver.use(webpackDevMiddleware(compiler, {\n  publicPath: config.output.publicPath\n}));\nserver.use(webpackHotMiddleware(compiler));\nserver.use(cors());\nserver.use(express.json()); // use json to post, update data in the DB \n\nserver.use(helmet());\nserver.use(morgan('combined')); //Route Use\n\nserver.use('/api-docs', swaggerUi.serve); //Swagger endpoint\n\nserver.use('/api/products', productsRouter);\nserver.use('/api/categories', categoriesRouter); // server.get('/', (req, res) => {\n//     res.sendFile(HTML_FILE);\n// })\n\nserver.get('/', function (req, res, next) {\n  compiler.outputFileSystem.readFile(HTML_FILE, function (err, result) {\n    if (err) {\n      return next(err);\n    }\n\n    res.set('content-type', 'text/html');\n    res.send(result);\n    res.end();\n  });\n});\nserver.get('/api-docs', swaggerUi.setup(swaggerDocument)); //The 404 Route (ALWAYS Keep this as the last route)\n\nserver.get('*', function (req, res) {\n  res.status(404).send('OOPS! Sorry that route does not exist...');\n});\nvar PORT = process.env.PORT || 8181;\nserver.listen(PORT, function () {\n  console.log(\"Magic Man listening on port: \".concat(PORT, \" in \").concat(\"development\"));\n});\n\n//# sourceURL=webpack:///./src/server/server.dev.js?");

/***/ }),

/***/ "./swagger.json":
/*!**********************!*\
  !*** ./swagger.json ***!
  \**********************/
/*! exports provided: swagger, info, host, basePath, tags, schemes, consumes, produces, paths, definitions, default */
/***/ (function(module) {

eval("module.exports = JSON.parse(\"{\\\"swagger\\\":\\\"2.0\\\",\\\"info\\\":{\\\"version\\\":\\\"1.0.0\\\",\\\"title\\\":\\\"ZILIS General API\\\",\\\"description\\\":\\\"This API was created to help cover general use cases that fall ouside of ByDesign and Wordpress scope of \\\",\\\"license\\\":{\\\"name\\\":\\\"MIT\\\",\\\"url\\\":\\\"https://opensource.org/licenses/MIT\\\"}},\\\"host\\\":\\\"localhost:4000\\\",\\\"basePath\\\":\\\"/api\\\",\\\"tags\\\":[{\\\"name\\\":\\\"Product\\\",\\\"description\\\":\\\"API for Products in the Database\\\"},{\\\"name\\\":\\\"Category\\\",\\\"description\\\":\\\"API for Categories in the Database\\\"}],\\\"schemes\\\":[\\\"http\\\"],\\\"consumes\\\":[\\\"application/json\\\"],\\\"produces\\\":[\\\"application/json\\\"],\\\"paths\\\":{\\\"/products\\\":{\\\"post\\\":{\\\"tags\\\":[\\\"Product\\\"],\\\"summary\\\":\\\"Add Product to Database\\\",\\\"description\\\":\\\"Create a new Product in Database\\\",\\\"parameters\\\":[{\\\"name\\\":\\\"Product\\\",\\\"in\\\":\\\"body\\\",\\\"description\\\":\\\"Product that we want to create\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}],\\\"produces\\\":[\\\"application/json\\\"],\\\"responses\\\":{\\\"201\\\":{\\\"description\\\":\\\"New Product is created\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}}},\\\"get\\\":{\\\"tags\\\":[\\\"Product\\\"],\\\"summary\\\":\\\"Get all Products in the Database\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}}}},\\\"/products/by-category/{category}\\\":{\\\"parameters\\\":[{\\\"name\\\":\\\"category\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"The product by category we want to find\\\",\\\"type\\\":\\\"string\\\"}],\\\"get\\\":{\\\"tags\\\":[\\\"Product\\\"],\\\"summary\\\":\\\"Get Products with given Category\\\",\\\"description\\\":\\\"Get all Products in Database by category\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}}}},\\\"/products/by-sku/{sku}\\\":{\\\"parameters\\\":[{\\\"name\\\":\\\"sku\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"The product by sku we want to find\\\",\\\"type\\\":\\\"string\\\"}],\\\"get\\\":{\\\"tags\\\":[\\\"Product\\\"],\\\"summary\\\":\\\"Get a Product with given SKU\\\",\\\"description\\\":\\\"Get a Product in Database by SKU\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}}}},\\\"/products/update-product/by-sku/{sku}\\\":{\\\"parameters\\\":[{\\\"name\\\":\\\"sku\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"Update Product with SKU\\\",\\\"type\\\":\\\"string\\\"}],\\\"put\\\":{\\\"tags\\\":[\\\"Product\\\"],\\\"summary\\\":\\\"Update a Products fields or field with given SKU\\\",\\\"description\\\":\\\"Update a Product in Database by SKU\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}}}},\\\"/products/delete-product/by-sku/:sku/:password\\\":{\\\"parameters\\\":[{\\\"name\\\":\\\"sku\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"Delete Product with SKU\\\",\\\"type\\\":\\\"string\\\"},{\\\"name\\\":\\\"password\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"Needed to delete Product with SKU\\\",\\\"type\\\":\\\"string\\\"}],\\\"delete\\\":{\\\"tags\\\":[\\\"Product\\\"],\\\"summary\\\":\\\"Delete a Products given SKU\\\",\\\"description\\\":\\\"Delete a Product in Database by SKU Password Protected\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Product\\\"}}}}},\\\"/categories\\\":{\\\"post\\\":{\\\"tags\\\":[\\\"Category\\\"],\\\"summary\\\":\\\"Add Category to Database\\\",\\\"description\\\":\\\"Create a new Categories in Database\\\",\\\"parameters\\\":[{\\\"name\\\":\\\"Categories\\\",\\\"in\\\":\\\"body\\\",\\\"description\\\":\\\"Categories that we want to create\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Category\\\"}}],\\\"produces\\\":[\\\"application/json\\\"],\\\"responses\\\":{\\\"201\\\":{\\\"description\\\":\\\"New Categories is created\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Category\\\"}}}},\\\"get\\\":{\\\"tags\\\":[\\\"Category\\\"],\\\"summary\\\":\\\"Get all Categories in the Database\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Category\\\"}}}}},\\\"/categories/{categoryName}\\\":{\\\"parameters\\\":[{\\\"name\\\":\\\"categoryName\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"Update Category with category name\\\",\\\"type\\\":\\\"string\\\"}],\\\"put\\\":{\\\"tags\\\":[\\\"Category\\\"],\\\"summary\\\":\\\"Update a Categories fields or field with given category name\\\",\\\"description\\\":\\\"Update a Category in Database by category name\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Category\\\"}}}}},\\\"/{categoryName}/{password}\\\":{\\\"parameters\\\":[{\\\"name\\\":\\\"categoryName\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"Delete Categories with category name\\\",\\\"type\\\":\\\"string\\\"},{\\\"name\\\":\\\"password\\\",\\\"in\\\":\\\"path\\\",\\\"required\\\":true,\\\"description\\\":\\\"Needed to delete Categories with category name\\\",\\\"type\\\":\\\"string\\\"}],\\\"delete\\\":{\\\"tags\\\":[\\\"Category\\\"],\\\"summary\\\":\\\"Delete a Products given category name and password\\\",\\\"description\\\":\\\"Delete a Product in Database by SKU Password Protected\\\",\\\"responses\\\":{\\\"200\\\":{\\\"description\\\":\\\"OK\\\",\\\"schema\\\":{\\\"$ref\\\":\\\"#/definitions/Category\\\"}}}}}},\\\"definitions\\\":{\\\"Product\\\":{\\\"required\\\":[\\\"email\\\",\\\"_id\\\"],\\\"properties\\\":{\\\"_id\\\":{\\\"type\\\":\\\"string\\\",\\\"uniqueItems\\\":true},\\\"sku\\\":{\\\"type\\\":\\\"string\\\",\\\"uniqueItems\\\":true},\\\"fk_category\\\":{\\\"type\\\":\\\"integer\\\"},\\\"description\\\":{\\\"type\\\":\\\"string\\\"},\\\"weight\\\":{\\\"type\\\":\\\"float\\\"},\\\"image_one_link\\\":{\\\"type\\\":\\\"string\\\"},\\\"image_two_link\\\":{\\\"type\\\":\\\"string\\\"},\\\"video_one_link\\\":{\\\"type\\\":\\\"string\\\"},\\\"video_two_link\\\":{\\\"type\\\":\\\"string\\\"},\\\"link_one\\\":{\\\"type\\\":\\\"string\\\"},\\\"link_two\\\":{\\\"type\\\":\\\"string\\\"},\\\"json-data\\\":{\\\"type\\\":\\\"json\\\"},\\\"created_at\\\":{\\\"type\\\":\\\"string\\\"}}},\\\"Products\\\":{\\\"type\\\":\\\"array\\\",\\\"$ref\\\":\\\"#/definitions/Product\\\"},\\\"Category\\\":{\\\"required\\\":[\\\"category_name\\\"],\\\"properties\\\":{\\\"_id\\\":{\\\"type\\\":\\\"integer\\\",\\\"uniqueItems\\\":true},\\\"category_name\\\":{\\\"type\\\":\\\"string\\\",\\\"uniqueItems\\\":true},\\\"created_at\\\":{\\\"type\\\":\\\"date\\\"}}},\\\"Categories\\\":{\\\"type\\\":\\\"array\\\",\\\"$ref\\\":\\\"#/definitions/Category\\\"}}}\");\n\n//# sourceURL=webpack:///./swagger.json?");

/***/ }),

/***/ "./webpack.dev.config.js":
/*!*******************************!*\
  !*** ./webpack.dev.config.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var path = __webpack_require__(/*! path */ \"path\");\n\nvar webpack = __webpack_require__(/*! webpack */ \"webpack\");\n\nvar HtmlWebPackPlugin = __webpack_require__(/*! html-webpack-plugin */ \"html-webpack-plugin\");\n\nmodule.exports = {\n  entry: {\n    main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']\n  },\n  output: {\n    path: path.join(__dirname, 'dist'),\n    publicPath: '/',\n    filename: '[name].js'\n  },\n  mode: 'development',\n  target: 'web',\n  devtool: 'source-map',\n  module: {\n    rules: [{\n      test: /\\.js$/,\n      exclude: /node_modules/,\n      loader: \"babel-loader\"\n    }, {\n      // Loads the javacript into html template provided.\n      // Entry point is set below in HtmlWebPackPlugin in Plugins \n      test: /\\.html$/,\n      use: [{\n        loader: \"html-loader\" //options: { minimize: true }\n\n      }]\n    }, {\n      test: /\\.css$/,\n      use: ['style-loader', 'css-loader']\n    }, {\n      test: /\\.(png|svg|jpg|gif)$/,\n      use: ['file-loader']\n    }]\n  },\n  plugins: [new HtmlWebPackPlugin({\n    template: \"./src/html/index.html\",\n    filename: \"index.html\",\n    excludeChunks: ['server']\n  }), new webpack.HotModuleReplacementPlugin()],\n  optimization: {\n    noEmitOnErrors: true\n  }\n};\n\n//# sourceURL=webpack:///./webpack.dev.config.js?");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cors\");\n\n//# sourceURL=webpack:///external_%22cors%22?");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"dotenv\");\n\n//# sourceURL=webpack:///external_%22dotenv%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "html-webpack-plugin":
/*!**************************************!*\
  !*** external "html-webpack-plugin" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"html-webpack-plugin\");\n\n//# sourceURL=webpack:///external_%22html-webpack-plugin%22?");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"knex\");\n\n//# sourceURL=webpack:///external_%22knex%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "swagger-ui-express":
/*!*************************************!*\
  !*** external "swagger-ui-express" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"swagger-ui-express\");\n\n//# sourceURL=webpack:///external_%22swagger-ui-express%22?");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack\");\n\n//# sourceURL=webpack:///external_%22webpack%22?");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-dev-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-dev-middleware%22?");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"webpack-hot-middleware\");\n\n//# sourceURL=webpack:///external_%22webpack-hot-middleware%22?");

/***/ })

/******/ });

