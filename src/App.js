import './App.css';
import { Main } from './components/Main';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <div className='flex flex-row w-screen h-screen'>
        <Main/>
        <Sidebar/>
    </div>
  );
}

export default App;
