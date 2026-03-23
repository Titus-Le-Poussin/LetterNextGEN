import JobTools from './pages/JobTools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthProvider from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Portfolio from './pages/Portfolio'

function App() {

  return (
  <BrowserRouter> 
    <AuthProvider> 
      <Routes> 
        <Route path="/" element={<JobTools />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/portfolio" element={<Portfolio />} />  
      </Routes>
    </AuthProvider>
  </BrowserRouter>)

}

export default App
 