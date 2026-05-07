import {createContext, useState, useEffect} from 'react'
import {register, login} from '../services/auth.service'

export const AuthContext = createContext()

function AuthProvider({ children }) {

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    async function handleLogin(email, password) {

        const data = await login(email, password) 
        localStorage.setItem("token", data.token)
        setToken(data.token)
        return data
    }

    async function handleRegister(username, email, password) {
        const data = await register(username, email, password)
        localStorage.setItem("token", data.token)
        setToken(data.token)
        return data
    }

    async function handleLogout() {
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ token, handleLogin, handleRegister, handleLogout}}>
            {children}
        </AuthContext.Provider>
    )

} 
export default AuthProvider

