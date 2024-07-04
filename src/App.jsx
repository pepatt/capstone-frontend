import './App.scss'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Calendar from './modals/Calendar'
import Details from './pages/Details/Details'

function App() {

  return (
    <BrowserRouter>
    <Routes>

      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/calendar" element={<Calendar/>} />
      <Route path="/details" element={<Details/>} />
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
