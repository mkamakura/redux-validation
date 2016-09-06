'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validationMiddleware;
function validationMiddleware() {
  return function (next) {
    return function (action) {
      return validation(action, next);
    };
  };

  function validation(action, next) {
    return action.meta && action.meta.validation ? runValidation(action, next) : next(action);
  }

  function runValidation(action, next) {
    var validationMessages = [];
    var keys = Object.keys(action.meta.validation);
    keys.map(function (key) {
      action.meta.validation[key].filter(function (validate) {
        return validate.func != undefined && typeof validate.func === 'function' && validate.msg != undefined;
      }).map(function (validate) {
        if (!validate.func(action.payload)) validationMessages[key] = validationMessages[key] == undefined ? validate.msg : [validationMessages[key], validate.msg];
      });
    });

    next(Object.assign({}, action, { payload: { data: action.payload, validation: validationMessages } }));
  }
}