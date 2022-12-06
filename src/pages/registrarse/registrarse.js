import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Registrarse() {

  const [nome, setNome] = useState([]);
  const [username, setUsername] = useState([]);
  const [senha, setSenha] = useState([]);

  const efetuarRegistro = () => {
    let url = `http://localhost:3001/users`;

    var requestData = {
      nome: nome,
      username: username,
      senha: senha
    };

    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };

    const response = fetch(url, requestOptions).then((response) => {
      if (response.status == 500 || response.status == 400) {
        toast.error("Falha ao criar usuario");
      } else {
        toast.success("Usuário registrado");
        setTimeout(() => {
          window.location.href = "http://localhost:3000/react-app/login";
        }, 1000)
      }
    });

    return response?.json();
  }

  return (
    <div className='container mt-4'>
      <ToastContainer />
      <form>
        <div class="mb-3">
          <label for="exampleInputName1" class="form-label">Nome</label>
          <input type="text" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" onChange={(e) => setNome(e.target.value)} />
          <div id="nameHelp" class="form-text">Nome e sobrenome. Exemplo: Dierison Sousa</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputUsername1" class="form-label">Username</label>
          <input type="text" class="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" onChange={(e) => setUsername(e.target.value)} />
          <div id="usernameHelp" class="form-text">Tente seu nome e sobrenome. Exemplo: higorbueno.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button onClick={efetuarRegistro} type="button" class="btn btn-dark">Registrar</button>
      </form>
    </div>
  );
}


export default Registrarse;