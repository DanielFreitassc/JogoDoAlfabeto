import { useState } from "react"
import { LoginContainer } from "./style"

export const Login = () => {
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    
const handleSubmit = async() => {
    window.alert(password)
}

    return(
        <LoginContainer>
            <form onSubmit={handleSubmit}>
                <label htmlFor=""> 
                    <p>Email</p>
                    <input type="email" onChange={(e) => setLogin(e.target.value)} required/>
                </label>
                <label htmlFor="">
                    <p>Senha</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} required/>
                </label>
                <p>Esqueceu  a senha ?</p>
                <button type="submit">Entrar</button>
            </form>
        </LoginContainer>
    )
}