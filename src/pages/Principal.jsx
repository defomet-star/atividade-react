import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Principal() {
  const [usuario, setUsuario] = useState(null);
  const [mensagem, setMensagem] = useState("Carregando dados...");

  const navigate = useNavigate();

  useEffect(() => {
    async function buscarDadosUsuario() {
      const usuarioLogado = auth.currentUser;

      if (!usuarioLogado) {
        navigate("/");
        return;
      }

      try {
        const uid = usuarioLogado.uid;
        const usuarioRef = doc(db, "usuarios", uid);
        const usuarioSnap = await getDoc(usuarioRef);

        if (usuarioSnap.exists()) {
          setUsuario(usuarioSnap.data());
          setMensagem("");
        } else {
          setMensagem("Dados do usuário não encontrados.");
        }
      } catch (error) {
        setMensagem("Erro ao buscar dados do usuário.");
        console.log(error);
      }
    }

    buscarDadosUsuario();
  }, [navigate]);

  function sair() {
    auth.signOut();
    navigate("/");
  }

  return (
    <div className="container">
      <h1>Página Principal</h1>

      {mensagem && <p>{mensagem}</p>}

      {usuario && (
        <div>
          <h2>Dados do usuário</h2>

          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>

          <p>
            <strong>Sobrenome:</strong> {usuario.sobrenome}
          </p>

          <p>
            <strong>Data de nascimento:</strong> {usuario.dataNascimento}
          </p>

          <button onClick={sair}>Sair</button>
        </div>
      )}
    </div>
  );
}

export default Principal;