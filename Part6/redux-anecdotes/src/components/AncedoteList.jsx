import { useDispatch ,useSelector} from 'react-redux'
import { sortAnecdotes ,voteAction} from '../reducers/anecdoteReducer'

const AnecdoteList=()=>{
    const dispatch=useDispatch();
    console.log(useSelector(state => state))

    const anecdotes = useSelector(state => {
      if (state.filter === null) {
        return state.anecdotes
                  .sort((a, b) => b.votes - a.votes)
      }
      return state.anecdotes.filter((anecdote) => 
          anecdote.content
              .toLowerCase()
              .includes(state.filter.toLowerCase()))
              .sort((a, b) => b.votes - a.votes)
    })

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