import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import "./login.css";
import logo from "../../assets/logo.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

async function loginEmail(event) {
    event.preventDefault();
    setMensagem("");

    try {
        await signInWithEmailAndPassword(auth, email, senha);
        navigate("/admin/panel");
    } catch (error) {
        console.error("ERRO NO LOGIN:", error.code, error.message);
        setMensagem("Não foi possível entrar. Confira o e-mail e a senha.");
    }
}

  return (
    <div className="login-page">
        <div className="login-card">
            <img src={logo} alt="Graça Divina" className="login-logo" />

            <h1>Bem-vinda!</h1>
            <p className="login-subtitle">Acesse o painel da Graça Divina</p>

            <form onSubmit={loginEmail}>
            <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
            />

            <button type="submit"> Entrar </button>
            </form>

            {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>
    </div>
  );
}

export default Login;
