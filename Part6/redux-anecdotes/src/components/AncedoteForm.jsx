import { useDispatch } from 'react-redux'
import { createAnecdotes } from '../reducers/anecdoteReducer'
import { setNotification,removeNotification} from '../reducers/notificationReducer';

const AnecdoteForm=()=>{
    const dispatch=useDispatch();

    const addAnecdote = async(event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value=''
        dispatch(createAnecdotes(content))
        dispatch(setNotification(`You added ${content}`))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)        } 
      
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