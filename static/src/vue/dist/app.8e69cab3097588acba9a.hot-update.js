webpackHotUpdate("app",{

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.array.iterator.js */ \"./node_modules/core-js/modules/es.array.iterator.js\");\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_array_iterator_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.js */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_promise_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.object.assign.js */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_object_assign_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/core-js/modules/es.promise.finally.js */ \"./node_modules/core-js/modules/es.promise.finally.js\");\n/* harmony import */ var _home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_home_alejandro_Development_napkin_napkin_frontend_node_modules_core_js_modules_es_promise_finally_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @mdi/font/css/materialdesignicons.css */ \"./node_modules/@mdi/font/css/materialdesignicons.css\");\n/* harmony import */ var _mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vue */ \"./node_modules/vue/dist/vue.esm.js\");\n/* harmony import */ var _App_vue__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./App.vue */ \"./src/App.vue\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vue-axios */ \"./node_modules/vue-axios/dist/vue-axios.es5.js\");\n/* harmony import */ var vue_axios__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(vue_axios__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! jwt-decode */ \"./node_modules/jwt-decode/build/jwt-decode.esm.js\");\n/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! vuex */ \"./node_modules/vuex/dist/vuex.esm.js\");\n/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! vuetify */ \"./node_modules/vuetify/dist/vuetify.js\");\n/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(vuetify__WEBPACK_IMPORTED_MODULE_11__);\n\n\n\n\n // Ensure you are using css-loader\n\n\n\n\n\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(vuex__WEBPACK_IMPORTED_MODULE_10__[\"default\"]);\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(vue_axios__WEBPACK_IMPORTED_MODULE_8___default.a, axios__WEBPACK_IMPORTED_MODULE_7___default.a);\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].use(vuetify__WEBPACK_IMPORTED_MODULE_11___default.a);\nvar store = new vuex__WEBPACK_IMPORTED_MODULE_10__[\"default\"].Store({\n  state: {\n    currentUser: localStorage.getItem('u'),\n    isAuth: false,\n    jwt: localStorage.getItem('t'),\n    endpoints: {\n      obtainJWT: '/auth/obtain_token',\n      refreshJWT: '/auth/refresh_token'\n    }\n  },\n  mutations: {\n    updateUsername: function updateUsername(state, username) {\n      state.currentUser = username;\n      localStorage.setItem('u', username);\n    },\n    updateIsAuth: function updateIsAuth(state, isAuth) {\n      state.isAuth = isAuth;\n    },\n    updateToken: function updateToken(state, newToken) {\n      localStorage.setItem('t', newToken);\n      state.jwt = newToken;\n    },\n    removeToken: function removeToken(state) {\n      localStorage.removeItem('t');\n      state.jwt = null;\n    }\n  },\n  actions: {\n    obtainToken: function obtainToken(context, data) {\n      var _this = this;\n\n      var payload = {\n        username: data.username,\n        password: data.password\n      };\n      axios__WEBPACK_IMPORTED_MODULE_7___default.a.post(this.state.endpoints.obtainJWT, payload).then(function (response) {\n        _this.commit('updateUsername', data.username);\n\n        _this.commit('updateToken', response.data.token);\n\n        _this.commit('updateIsAuth', true);\n      }).catch(function (error) {\n        console.log(error);\n\n        _this.commit('updateIsAuth', false);\n      });\n    },\n    refreshToken: function refreshToken() {\n      var _this2 = this;\n\n      var payload = {\n        token: this.state.jwt\n      };\n      axios__WEBPACK_IMPORTED_MODULE_7___default.a.post(this.state.endpoints.refreshJWT, payload).then(function (response) {\n        _this2.commit('updateToken', response.data.token);\n\n        _this2.commit('updateIsAuth', true);\n      }).catch(function (error) {\n        console.log(error);\n\n        _this2.commit('updateIsAuth', false);\n      });\n    },\n    inspectToken: function inspectToken() {\n      console.log(\"Inspect token\", this.state.jwt);\n      var token = this.state.jwt;\n\n      if (token) {\n        var decoded = Object(jwt_decode__WEBPACK_IMPORTED_MODULE_9__[\"default\"])(token);\n        var exp = decoded.exp;\n        var orig_iat = decoded.orig_iat;\n        console.log(\"Decoded token \", decoded); //const orig_iat = decoded.orig_iat\n        // if (Date.now() >= exp * 1000) {\n        //   this.commit('updateIsAuth', false);\n        // } else {\n        //   console.log(\"Do nothing\");\n        //   this.commit('updateIsAuth', true);\n        // }\n\n        if (exp - Date.now() / 1000 > 1800 && Date.now() / 1000 - orig_iat < 628200) {\n          this.dispatch('refreshToken');\n          this.commit('updateIsAuth', true);\n          console.log(\"TOKEN IS VALID REFRESH\");\n        } else if (exp - Date.now() / 1000 < 1800) {\n          // DO NOTHING, DO NOT REFRESH          \n          console.log(\"DO NOTHING DO NOT REFRESH\");\n        } else {\n          // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL\n          console.log(\"PROMPT RELOGIN\");\n        }\n      }\n    },\n    logout: function logout() {\n      this.commit('removeToken');\n      this.commit('updateIsAuth', false);\n    }\n  }\n});\nvue__WEBPACK_IMPORTED_MODULE_5__[\"default\"].config.productionTip = false;\nnew vue__WEBPACK_IMPORTED_MODULE_5__[\"default\"]({\n  icons: {\n    iconfont: 'mdi' // default - only for display purposes\n\n  },\n  store: store,\n  vuetify: new vuetify__WEBPACK_IMPORTED_MODULE_11___default.a({}),\n  render: function render(h) {\n    return h(_App_vue__WEBPACK_IMPORTED_MODULE_6__[\"default\"]);\n  }\n}).$mount('#app');//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvbWFpbi5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYWluLmpzPzU2ZDciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdAbWRpL2ZvbnQvY3NzL21hdGVyaWFsZGVzaWduaWNvbnMuY3NzJyAvLyBFbnN1cmUgeW91IGFyZSB1c2luZyBjc3MtbG9hZGVyXG5cblxuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLnZ1ZSdcblxuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuaW1wb3J0IFZ1ZUF4aW9zIGZyb20gJ3Z1ZS1heGlvcydcbmltcG9ydCBqd3RfZGVjb2RlIGZyb20gJ2p3dC1kZWNvZGUnXG5pbXBvcnQgVnVleCBmcm9tICd2dWV4J1xuXG5pbXBvcnQgVnVldGlmeSBmcm9tICd2dWV0aWZ5JztcblxuXG5WdWUudXNlKFZ1ZXgpO1xuVnVlLnVzZShWdWVBeGlvcywgYXhpb3MpO1xuXG5WdWUudXNlKFZ1ZXRpZnkpO1xuXG5jb25zdCBzdG9yZSA9IG5ldyBWdWV4LlN0b3JlKHtcbiAgc3RhdGU6IHtcbiAgICBjdXJyZW50VXNlcjogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3UnKSxcbiAgICBpc0F1dGg6IGZhbHNlLFxuICAgIGp3dDogbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3QnKSxcbiAgICBlbmRwb2ludHM6IHtcbiAgICAgIG9idGFpbkpXVDogJy9hdXRoL29idGFpbl90b2tlbicsXG4gICAgICByZWZyZXNoSldUOiAnL2F1dGgvcmVmcmVzaF90b2tlbidcbiAgICB9XG4gIH0sXG4gIG11dGF0aW9uczoge1xuICAgIHVwZGF0ZVVzZXJuYW1lKHN0YXRlLCB1c2VybmFtZSkge1xuICAgICAgc3RhdGUuY3VycmVudFVzZXIgPSB1c2VybmFtZTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd1JywgdXNlcm5hbWUpO1xuICAgIH0sXG4gICAgdXBkYXRlSXNBdXRoKHN0YXRlLCBpc0F1dGgpIHtcbiAgICAgIHN0YXRlLmlzQXV0aCA9IGlzQXV0aDtcbiAgICB9LFxuICAgIHVwZGF0ZVRva2VuKHN0YXRlLCBuZXdUb2tlbikge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3QnLCBuZXdUb2tlbik7XG4gICAgICBzdGF0ZS5qd3QgPSBuZXdUb2tlbjtcbiAgICB9LFxuICAgIHJlbW92ZVRva2VuKHN0YXRlKSB7XG4gICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndCcpO1xuICAgICAgc3RhdGUuand0ID0gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGFjdGlvbnM6IHtcbiAgICBvYnRhaW5Ub2tlbihjb250ZXh0LCBkYXRhKSB7XG4gICAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgICB1c2VybmFtZTogZGF0YS51c2VybmFtZSxcbiAgICAgICAgcGFzc3dvcmQ6IGRhdGEucGFzc3dvcmRcbiAgICAgIH1cbiAgICAgIGF4aW9zLnBvc3QodGhpcy5zdGF0ZS5lbmRwb2ludHMub2J0YWluSldULCBwYXlsb2FkKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLmNvbW1pdCgndXBkYXRlVXNlcm5hbWUnLCBkYXRhLnVzZXJuYW1lKTtcbiAgICAgICAgICB0aGlzLmNvbW1pdCgndXBkYXRlVG9rZW4nLCByZXNwb25zZS5kYXRhLnRva2VuKTtcbiAgICAgICAgICB0aGlzLmNvbW1pdCgndXBkYXRlSXNBdXRoJywgdHJ1ZSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgdGhpcy5jb21taXQoJ3VwZGF0ZUlzQXV0aCcsIGZhbHNlKTtcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIHJlZnJlc2hUb2tlbigpIHtcbiAgICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICAgIHRva2VuOiB0aGlzLnN0YXRlLmp3dFxuICAgICAgfVxuICAgICAgYXhpb3MucG9zdCh0aGlzLnN0YXRlLmVuZHBvaW50cy5yZWZyZXNoSldULCBwYXlsb2FkKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICB0aGlzLmNvbW1pdCgndXBkYXRlVG9rZW4nLCByZXNwb25zZS5kYXRhLnRva2VuKVxuICAgICAgICAgIHRoaXMuY29tbWl0KCd1cGRhdGVJc0F1dGgnLCB0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxuICAgICAgICAgIHRoaXMuY29tbWl0KCd1cGRhdGVJc0F1dGgnLCBmYWxzZSk7XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBpbnNwZWN0VG9rZW4oKSB7XG4gICAgICBjb25zb2xlLmxvZyhcIkluc3BlY3QgdG9rZW5cIiwgdGhpcy5zdGF0ZS5qd3QpO1xuICAgICAgY29uc3QgdG9rZW4gPSB0aGlzLnN0YXRlLmp3dDtcbiAgICAgIGlmICh0b2tlbikge1xuICAgICAgICBjb25zdCBkZWNvZGVkID0gand0X2RlY29kZSh0b2tlbik7XG4gICAgICAgIGNvbnN0IGV4cCA9IGRlY29kZWQuZXhwO1xuICAgICAgICBjb25zdCBvcmlnX2lhdCA9IGRlY29kZWQub3JpZ19pYXQ7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJEZWNvZGVkIHRva2VuIFwiLCBkZWNvZGVkKTtcbiAgICAgICAgLy9jb25zdCBvcmlnX2lhdCA9IGRlY29kZWQub3JpZ19pYXRcblxuICAgICAgICAvLyBpZiAoRGF0ZS5ub3coKSA+PSBleHAgKiAxMDAwKSB7XG4gICAgICAgIC8vICAgdGhpcy5jb21taXQoJ3VwZGF0ZUlzQXV0aCcsIGZhbHNlKTtcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICBjb25zb2xlLmxvZyhcIkRvIG5vdGhpbmdcIik7XG4gICAgICAgIC8vICAgdGhpcy5jb21taXQoJ3VwZGF0ZUlzQXV0aCcsIHRydWUpO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgaWYgKGV4cCAtIChEYXRlLm5vdygpIC8gMTAwMCkgPiAxODAwICYmIChEYXRlLm5vdygpIC8gMTAwMCkgLSBvcmlnX2lhdCA8IDYyODIwMCkge1xuICAgICAgICAgIHRoaXMuZGlzcGF0Y2goJ3JlZnJlc2hUb2tlbicpXG4gICAgICAgICAgdGhpcy5jb21taXQoJ3VwZGF0ZUlzQXV0aCcsIHRydWUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKFwiVE9LRU4gSVMgVkFMSUQgUkVGUkVTSFwiKTtcbiAgICAgICAgfSBlbHNlIGlmIChleHAgLSAoRGF0ZS5ub3coKSAvIDEwMDApIDwgMTgwMCkge1xuICAgICAgICAgIC8vIERPIE5PVEhJTkcsIERPIE5PVCBSRUZSRVNIICAgICAgICAgIFxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiRE8gTk9USElORyBETyBOT1QgUkVGUkVTSFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQUk9NUFQgVVNFUiBUTyBSRS1MT0dJTiwgVEhJUyBFTFNFIENMQVVTRSBDT1ZFUlMgVEhFIENPTkRJVElPTiBXSEVSRSBBIFRPS0VOIElTIEVYUElSRUQgQVMgV0VMTFxuICAgICAgICAgIGNvbnNvbGUubG9nKFwiUFJPTVBUIFJFTE9HSU5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGxvZ291dCgpIHtcbiAgICAgIHRoaXMuY29tbWl0KCdyZW1vdmVUb2tlbicpO1xuICAgICAgdGhpcy5jb21taXQoJ3VwZGF0ZUlzQXV0aCcsIGZhbHNlKTtcbiAgICB9XG4gIH1cbn0pXG5cblxuVnVlLmNvbmZpZy5wcm9kdWN0aW9uVGlwID0gZmFsc2Vcbm5ldyBWdWUoe1xuICBpY29uczoge1xuICAgIGljb25mb250OiAnbWRpJywgLy8gZGVmYXVsdCAtIG9ubHkgZm9yIGRpc3BsYXkgcHVycG9zZXNcbiAgfSxcbiAgc3RvcmU6IHN0b3JlLFxuICB2dWV0aWZ5OiBuZXcgVnVldGlmeSh7XG5cbiAgfSksXG4gIHJlbmRlcjogaCA9PiBoKEFwcClcbn0pLiRtb3VudCgnI2FwcCcpXG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFHQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFKQTtBQVNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBZkE7QUFpQkE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFEQTtBQUdBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBakVBO0FBM0JBO0FBaUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUdBO0FBQ0E7QUFHQTtBQUFBO0FBQUE7QUFSQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/main.js\n");

/***/ })

})