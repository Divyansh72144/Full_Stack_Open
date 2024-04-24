import { useEffect } from 'react';
import anecdoteServices from '../services/anecdoteServices';
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux';


import AnecdoteForm from './components/AncedoteForm'
import AnecdoteList from './components/AncedoteList';
import AnecdoteFilter from './components/AnecdoteFilter';
import Notification from './components/Notification';

const App = () => {
  const dispatch =useDispatch();  

  useEffect(()=>{
    anecdoteServices.getAll().then(anecdotes=>{
      dispatch(setAnecdotes(anecdotes))
    })
  },[dispatch])

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