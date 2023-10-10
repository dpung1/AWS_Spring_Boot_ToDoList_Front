import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import RootLayout from './Components/Layout/RootLayout/RootLayout';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path='/signup' element={ <Signup /> }/>
      </Routes>
    </RootLayout>
  );
}

export default App;
