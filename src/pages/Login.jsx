import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../services/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  async function fazerLogin(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);

      navigate("/principal");
    } catch (error) {
      setMensagem("Usuário não cadastrado ou senha incorreta.");
      console.log(error);
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>

      <form onSubmit={fazerLogin}>
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

        <button type="submit">Entrar</button>
      </form>

      <p>{mensagem}</p>

      <Link to="/cadastro">Criar uma conta</Link>
    </div>
  );
}

export default Login;