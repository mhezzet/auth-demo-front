import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from './reducers/auth';
import userReducer from './reducers/user';

export default function Store({ children }) {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      user: userReducer
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return <Provider store={store}>{children}</Provider>;
}
