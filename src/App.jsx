import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Calendar from './components/Calendar/Calendar'
import Details from './pages/Details/Details'
import Friends from './pages/Friends/Friends'


function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/calendar" element={<Calendar/>} />
        <Route path="/details" element={<Details/>} />
        <Route path="/friends" element={<Friends/>} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
