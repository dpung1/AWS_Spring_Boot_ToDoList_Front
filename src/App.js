import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup/Signup';
import RootLayout from './Components/Layout/RootLayout/RootLayout';
import Singin from './pages/Singin/Singin';
import Main from './pages/Main/Main';
import AuthRouter from './auth/AuthRouter';

function App() {
  return (
    <RootLayout>
      <Routes>
        <Route path='/' element={ <AuthRouter element={ <Main /> } /> }/>
        <Route path='/auth/signup' element={ <AuthRouter element={ <Signup /> } /> }/>
        <Route path='/auth/signin' element={ <AuthRouter element={ <Singin /> } /> }/>
      </Routes>
    </RootLayout>
  );
}

export default App;
