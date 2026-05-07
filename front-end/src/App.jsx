import JobTools from './pages/JobTools'
import GuestTools from './pages/GuestTools'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AuthProvider, { AuthContext } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Portfolio from './pages/Portfolio'
import { useContext } from 'react'

function ProtectedRoute({ children, redirectTo = '/login' }) {
  const { token } = useContext(AuthContext)
  if (!token) return <Navigate to={redirectTo} replace />
  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<ProtectedRoute><JobTools /></ProtectedRoute>} />
          <Route path="/tools" element={<ProtectedRoute redirectTo="/login"><GuestTools /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
 