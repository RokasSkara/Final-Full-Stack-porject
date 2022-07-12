import './App.css';
import { Route, Routes } from 'react-router-dom'
//Componenets
import Header from './components/JS/header'
import Footer from './components/JS/footer'
//pages
import AskAQuestion from '../src/components/pages/createQuestionPage'
import HomePage from '../src/components/pages/home'

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage /> } />
        <Route path="/askquestion" element={<AskAQuestion />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
