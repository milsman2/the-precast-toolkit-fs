import './App.css';
import PostsList from './features/posts/PostsList'
import AddPostForm from './features/posts/addPostForm'

function App() {
  return (
    <div className="App">
      <AddPostForm />
      <PostsList />
    </div>
  );
}

export default App;
