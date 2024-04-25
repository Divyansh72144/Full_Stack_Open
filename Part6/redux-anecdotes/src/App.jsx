import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initalizeAnecdotes } from './reducers/anecdoteReducer';

import AnecdoteForm from './components/AncedoteForm'
import AnecdoteList from './components/AncedoteList';
import AnecdoteFilter from './components/AnecdoteFilter';
import Notification from './components/Notification';

const App = () => {
  const dispatch =useDispatch();  

  useEffect(()=>{
    dispatch(initalizeAnecdotes())
  },[])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App;