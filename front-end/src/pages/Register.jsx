import {useContext, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'



function Register()  {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { handleRegister } = useContext(AuthContext)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        const Register = await handleRegister(username, email, password)
        navigate('/')
    }
    return (
    <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label for="username-alternative" className="block mb-2.5 text-sm font-medium text-heading">Your username</label>
        <input type="text" id="email-alternative" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="John Doe" required />
      </div>
      <div className="mb-5">
        <label for="email-alternative" className="block mb-2.5 text-sm font-medium text-heading">Your email</label>
        <input type="email" id="email-alternative" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="name@flowbite.com" required />
      </div>
      <div className="mb-5">
        <label for="password-alternative" className="block mb-2.5 text-sm font-medium text-heading">Your password</label>
        <input type="password" id="password-alternative" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow placeholder:text-body" placeholder="••••••••" required />
      </div>
      <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded" >Submit</button>
    </form>
    )
}
export default Register