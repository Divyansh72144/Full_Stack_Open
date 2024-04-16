import {combineReducers} from 'redux';
import anecdoteReducer from './anecdoteReducer';
import filterReducer from './filterReducer';


const rootReducer = combineReducers({
    anecdotes: anecdoteReducer,
    filter: filterReducer,
});


export default rootReducer;