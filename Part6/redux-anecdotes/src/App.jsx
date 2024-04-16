import AnecdoteForm from './components/AncedoteForm'
import AnecdoteList from './components/AncedoteList';
import AnecdoteFilter from './components/AnecdoteFilter';

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App;