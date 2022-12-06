import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function Login() {

  const [usuario, setUsuario] = useState([]);
  const [senha, setSenha] = useState([]);

  const efetuarLogin = () => {
    let url = `http://localhost:3001/users/login`;

    var requestData = { username: usuario, senha: senha };
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
    };

    const response = fetch(url, requestOptions).then((response) => {
      if (response.status == 500 || response.status == 404) {
        toast.error("Verifique usuário e senha");
      } else {
        toast.success("Usuário logado.");
        response.json().then(data => {
          console.log(data);
          localStorage.setItem("usuario", JSON.stringify(data));
          setTimeout(() => {
            window.location.href = "minhas-consultas";
          }, 1000)
        })
      }
    });

    return response?.json();
  }

  return (
    <div className='container mt-4'>
      <ToastContainer />
      <form>
        <div class="mb-3">
          <label for="exampleInputUsername1" class="form-label">Username</label>
          <input type="text" class="form-control" id="exampleInputUsername1" aria-describedby="usernameHelp" onChange={(e) => setUsuario(e.target.value)} />
          <div id="usernameHelp" class="form-text">Tente seu nome e sobrenome. Exemplo: higorbueno.</div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1" onChange={(e) => setSenha(e.target.value)} />
        </div>
        <button onClick={efetuarLogin} type="button" class="btn btn-dark">Login</button>
        <button type="button" class="btn btn-dark ms-4"><Link to="registrarse" style={{textDecoration: "none", color: "white"}}> Registrar </Link></button>
      </form>
    </div>
  );
}


export default Login;