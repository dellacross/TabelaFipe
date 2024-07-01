import React, { useState, useContext } from 'react'
import './styles.css'
import Wrapper from '../../parts/Wrapper'
import SelectUF from '../../components/SelectUF'
import { AuthContext } from '../../context/provider'

const LoginPage = () => {
    
    const [user, setUser] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [registerPassword, setRegisterPassword] = useState("")
    const [registerPasswordAgain, setRegisterPasswordAgain] = useState("")
    const [cardToShow, setCardToShow] = useState(0)
    const [UF, setUF] = useState(null)
    const { handleLogin, handleRegister } = useContext(AuthContext)

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        handleLogin({user: user, password: password}, e)
    }

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        handleRegister({user: email, nome: name, estado: UF, password: registerPassword}, e)
    }

    return (
        <Wrapper>
            <main>
                <div id="login-card">
                    {
                        cardToShow === 1 &&
                        <section>
                            <h2>Registrar</h2>
                            <form onSubmit={handleSubmitRegister}>
                                <label htmlFor="register-login-name">
                                    <input 
                                        type="text" 
                                        placeholder='Nome'
                                        name="register-login-name"
                                        id="register-login-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="register-login-email">
                                    <input 
                                        type="text" 
                                        placeholder='E-mail'
                                        name="register-login-email"
                                        id="register-login-email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="register-login-password">
                                    <input 
                                        type="password" 
                                        placeholder='Senha'
                                        name="register-login-password"
                                        id="register-login-password"
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="register-login-password-again">
                                    <input 
                                        type="password" 
                                        placeholder='Repita a Senha'
                                        name="register-login-password-again"
                                        id="register-login-password-again"
                                        value={registerPasswordAgain}
                                        onChange={(e) => setRegisterPasswordAgain(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="select-uf">
                                    <SelectUF 
                                        handleChange={setUF}
                                        defaultValue={UF}
                                    />
                                </label>
                                <button>Registrar</button>
                                <span id="to-register">
                                    Já tem uma conta? <button onClick={() => setCardToShow(0)}>Clique aqui</button>
                                </span>
                            </form>
                        </section>
                    }
                    {
                        cardToShow === 0 &&
                        <section>
                            <h2>Login</h2>
                            <form onSubmit={handleSubmitLogin}>
                                <label htmlFor="login-user">
                                    <input 
                                        type="text" 
                                        placeholder='Usuário'
                                        name="login-user"
                                        id="login-user"
                                        value={user}
                                        onChange={(e) => setUser(e.target.value)}
                                    />
                                </label>
                                <label htmlFor="login-password" id="teste-label">
                                    <input 
                                        type="password" 
                                        placeholder='Senha'
                                        name="login-password"
                                        id="login-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </label>
                                <button>Entrar</button>
                                <span id="to-register">
                                    Ainda não tem uma conta? <button onClick={() => setCardToShow(1)}>Clique aqui</button>
                                </span>
                            </form>
                        </section>
                    }
                </div>
            </main>
        </Wrapper>
    )
}

export default LoginPage