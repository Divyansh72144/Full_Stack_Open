import { useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'

const AnecdoteForm=()=>{
    const dispatch=useDispatch();

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value=''
        dispatch(createAnecdotes(content))
      } 
      
  return (
    <div>
      <h2>Create New Anecdote</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;