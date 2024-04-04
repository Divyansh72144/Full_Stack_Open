import { useDispatch ,useSelector} from 'react-redux'
import { sortAnecdotes ,voteAction} from '../reducers/anecdoteReducer'


const AnecdoteList=()=>{
    const dispatch=useDispatch();
    const anecdotes = useSelector(state => state)

    const sortTheAnecdotes=()=>{
        dispatch(sortAnecdotes())
      }
    const vote = (id) => {
        dispatch(voteAction(id))
        console.log('vote', id)
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
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      </div>
  );
};

export default AnecdoteList;