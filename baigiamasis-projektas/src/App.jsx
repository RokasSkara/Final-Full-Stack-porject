import './App.css';
import { Route, Routes } from 'react-router-dom'
import { createContext, useState } from 'react'
//Componenets
import Header from './components/JS/header'
import Footer from './components/JS/footer'
//pages
import AskAQuestion from '../src/components/pages/createQuestionPage'
import HomePage from '../src/components/pages/home'
import UserContext from './components/JS/userContext';
import LoginForm from './components/pages/loginPage';
import RegisterForm from './components/pages/register';



function App() {

  const [user, setUser] = useState(null)

  return (
    <div className='App'>
      <UserContext.Provider value={user} >
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/askquestion' element={<AskAQuestion />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div >

  );
}

export default App;
