import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import App from './App'

import anecdoteReducer, { appendAnecdote,setAnecdotes } from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import anecdoteService from '../services/anecdoteServices'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification:notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes => {
 store.dispatch(setAnecdotes(anecdotes))
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)