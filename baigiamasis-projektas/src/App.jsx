import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
//Componenets
import Header from './components/JS/header'
import Footer from './components/JS/footer'
//pages
import AskAQuestion from '../src/components/pages/createQuestionPage'
import HomePage from '../src/components/pages/home'
import Profile from '../src/components/pages/profile'
import UserContext from './components/JS/userContext';
import LoginForm from './components/pages/loginPage';
import RegisterForm from './components/pages/register';
import ViewQuestionPage from './components/pages/viewQuestionPage';



function App() {

  const [user, setUser] = useState(null)

  const value = {
    user,
    setUser,
    checkAuth
  }

  function checkAuth(){
    fetch('http://localhost:5000/userVerify', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        data.err? setUser(null) : setUser(data);
        
      }
      )
      .catch(() => {
        setUser(null)
      })
  }

  useEffect(() => {
    checkAuth()
  },[setUser])

  return (
    <div className='App'>
      <UserContext.Provider value={value} >
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/logout' element={<RegisterForm />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/questions/:id' element={<ViewQuestionPage />} />
          <Route path='/askquestion' element={<AskAQuestion />} />
        </Routes>
        <Footer />
      </UserContext.Provider>
    </div >

  );
}

export default App;
