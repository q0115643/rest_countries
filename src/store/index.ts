import logger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { State, reducer, initialState } from 'reducers';
import ReduxThunk from 'redux-thunk';


const middlewares = [ReduxThunk, logger];

const store = createStore<State, any, any, any>(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
);


export default store;
