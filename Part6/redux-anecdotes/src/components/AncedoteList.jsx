import { useDispatch ,useSelector} from 'react-redux'
import { sortAnecdotes ,vote} from '../reducers/anecdoteReducer'
import { setNotification,removeNotification } from '../reducers/notificationReducer';

const AnecdoteList=()=>{
    const dispatch=useDispatch();

    const anecdotes = useSelector((state) => state.anecdotes);
    console.log(anecdotes);

    const sortTheAnecdotes=()=>{
        dispatch(sortAnecdotes())
      }

    const voteAnecdotes = (id) => {
        dispatch(vote({id:id}))
        dispatch(setNotification(`You voted for ${anecdotes.find(anecdote=>anecdote.id===id).content}`))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000)  
    }
      
  return (
    <div>
      <button onClick={sortTheAnecdotes}>Sort anecdotes</button>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteAnecdotes(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  );
};

export default AnecdoteList;