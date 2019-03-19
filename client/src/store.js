import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/'

const initialState = {};

// Thunk is a middleware that looks at every action that passes through the system, 
// and if it’s a function, it calls that function
const middleware = [thunk];

// First parameter = root reducer
// Second parameter = initial state
// Third parameter = compose all middleware(runs right function to left)
const store = createStore(
    rootReducer, 
    initialState,
    compose( 
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
));

export default store;