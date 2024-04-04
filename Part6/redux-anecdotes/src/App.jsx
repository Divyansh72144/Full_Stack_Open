import AnecdoteForm from './components/AncedoteForm'
import AnecdoteList from './components/AncedoteList';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App;