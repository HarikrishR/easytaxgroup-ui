import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import recuder from './reducers/reducers';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  recuder,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;