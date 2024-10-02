import { LoginContainer } from "./style"

export const Login = () => {
    return(
        <LoginContainer>
            <form>
                <label htmlFor=""> 
                    <p>Email</p>
                    <input type="email" />
                </label>
                <label htmlFor="">
                    <p>Senha</p>
                    <input type="password"/>
                </label>
                <p>Esqueceu  a senha ?</p>
                <button type="submit">Entrar</button>
            </form>
        </LoginContainer>
    )
}