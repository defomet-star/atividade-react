import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";

function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  async function cadastrarUsuario(e) {
    e.preventDefault();

    try {
      const usuarioCriado = await createUserWithEmailAndPassword(
        auth,
        email,
        senha
      );

      const uid = usuarioCriado.user.uid;

      await setDoc(doc(db, "usuarios", uid), {
        uid: uid,
        email: email,
        nome: nome,
        sobrenome: sobrenome,
        dataNascimento: dataNascimento,
      });

      setMensagem("Usuário cadastrado com sucesso!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
} catch (error) {
  console.log(error.code);
  console.log(error.message);

  if (error.code === "auth/email-already-in-use") {
    setMensagem("Este e-mail já está cadastrado.");
  } else if (error.code === "auth/weak-password") {
    setMensagem("A senha precisa ter pelo menos 6 caracteres.");
  } else if (error.code === "auth/invalid-email") {
    setMensagem("E-mail inválido.");
  } else {
    setMensagem("Erro ao cadastrar usuário: " + error.code);
  }
}
  }

  return (
    <div className="container">
      <h1>Cadastro</h1>

      <form onSubmit={cadastrarUsuario}>
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

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Sobrenome"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          required
        />

        <input
          type="date"
          value={dataNascimento}
          onChange={(e) => setDataNascimento(e.target.value)}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>

      <p>{mensagem}</p>

      <Link to="/">Já tenho conta</Link>
    </div>
  );
}

export default Cadastro;