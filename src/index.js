export default function validationMiddleware() {
  return (next) => (action) => validation(action, next);

  function validation(action, next) {
    return action.meta && action.meta.validation ?
      runValidation(action, next) :
      next(action);
  }

  function runValidation(action, next) {
    let validationMessages = [];
    const keys = Object.keys(action.meta.validation);
    keys.map((key) => {
      action.meta.validation[key]
        .filter((validate) => validate.func != undefined &&
          typeof validate.func === 'function' && validate.msg != undefined)
        .map((validate) => {
          if (!validate.func(action.payload))
            validationMessages[key] =
              validationMessages[key] == undefined ? validate.msg : [validationMessages[key], validate.msg];
        });
    });

    next(Object.assign({}, action, { payload: { data: action.payload, validation: validationMessages } }));
  }
}
