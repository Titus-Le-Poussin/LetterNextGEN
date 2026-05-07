import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const { handleRegister } = useContext(AuthContext)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setLoading(true)
        try {
            await handleRegister(username, email, password)
            navigate('/tools', { replace: true })
        } catch {
            setError("Une erreur est survenue lors de l'inscription.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="mb-8 text-center">
                    <Link to="/login" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                        ← Retour à la connexion
                    </Link>
                    <h1 className="text-white font-black text-3xl mt-6 mb-1">Créer un compte</h1>
                    <p className="text-zinc-500 text-sm">Accédez à LetterNextGEN gratuitement</p>
                </div>

                <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Nom d'utilisateur</label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            placeholder="Jean Dupont"
                            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 text-sm transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            placeholder="nom@exemple.com"
                            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 text-sm transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider">Mot de passe</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-green-500 text-sm transition-colors"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-semibold transition-colors mt-1">
                        {loading ? 'Création...' : "S'inscrire"}
                    </button>

                    <p className="text-center text-zinc-500 text-sm">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-green-500 hover:text-green-400 font-medium transition-colors">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register