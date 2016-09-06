# redux-validation
validate for action property

## Installation
```
npm install --save redux-validation
```

## Usage

- applyMiddleware
```js
import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import createLogger from 'redux-logger';
import validationMiddleware from 'redux-validation';

export default function() {
  const createStoreWithMiddleware = applyMiddleware(validationMiddleware, createLogger())(createStore);
  return createStoreWithMiddleware(reducer);
}
```

- createAction of `redux-actions`
```js
export const sample = createAction(ACTION_TYPE, (payload) => paylaod, () => ({
  validation: {
    name: [   // input name
     {
        func: (payload) => payload.length > 0, // validation
        msg: 'Name must be Required.', // invalid message
      },
    ],
  },
});
```

- handleActions of `redux-actions`
```js
export default handleActions({
  [ACTION_TYPE]: (state, { payload: { data, validation } }) => ({
    ...state,
    name: data,
    validation,
  }),
}, {});
```
