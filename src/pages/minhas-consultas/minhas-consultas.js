import React, { useState } from "react";
import "./minhas-consultas.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { BsFillCheckSquareFill } from "react-icons/bs";


function MinhasConsultas() {
  const [fraseParaEditar, setFraseParaEditar] = useState('');
  const [idParaEditar, setIdParaEditar] = useState('');
  const [frases, setFrases] = useState([]);


  const listarConsultas = () => {
    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario == null) {
      window.location.href = "login";
    } else {
      let url = `http://localhost:3001/frases/usuario/${usuario.id}`;
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setFrases(json.listaFrases);
        })
        .catch(() => {
          toast.error("Erro ao consultar frases do usuário");
        });
    }
  }

  const fazerLogout = () => {
    localStorage.clear();
    window.location.href = "login";
  }

  const salvarConsulta = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario == null) {
      window.location.href = "login";
    } else {
      const url = `http://localhost:3001/frases/${idParaEditar}`

      const data = {
        idUsuario: usuario.id,
        frase: fraseParaEditar
      }

      fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(() => {
        listarConsultas();
      });
    }
  }

  const deletarConsulta = () => {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario == null) {
      window.location.href = "login";
    } else {
      const url = `http://localhost:3001/frases/${idParaEditar}`
      console.log(usuario.id)

      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        }
      }).then(() => {
        listarConsultas();
      });
    }
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <button onClick={listarConsultas} className="btn btn-dark"> Carregar minhas consultas </button>
      <button onClick={fazerLogout} className="ms-5 btn btn-dark"> Fazer logout </button>
      <form>
        <label class="form-label mt-3">Editar consultas</label>
        <div class="mb-3 mt-1 d-flex row">
          <div class="col-1">
            <label for="inputId" class="form-label">ID</label>
            <input type="text" class="form-control" id="inputId" onChange={(e) => setIdParaEditar(e.target.value)} />
            <div id="idHelp" class="form-text">ID consulta</div>
          </div>

          <div class="col-10">
            <label for="inputConsulta" class="form-label">Consulta</label>
            <input type="text" class="form-control" id="inputConsulta" onChange={(e) => setFraseParaEditar(e.target.value)} />
            <div id="usernameHelp" class="form-text">Digite o novo texto desta consulta</div>
          </div>

          <div class="col-1 d-flex align-items-center">
            <button type="button" class="btn btn-success me-1" onClick={salvarConsulta}> <BsFillCheckSquareFill /> </button>
            <button type="button" class="btn btn-danger" onClick={deletarConsulta}> <MdDelete /> </button>
          </div>
        </div>

      </form>
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Consulta</th>
          </tr>
        </thead>
        <tbody>
          <ConsultasList frases={frases} />
        </tbody>
      </table>
    </div>
  );
}

export default MinhasConsultas;

function ConsultasList(props) {
  if (props.frases == null) {
    return (<div></div>);
  } else {
    return (
      props.frases.map((frase) =>
        <tr>
          <td class="fw-bold">{frase.idFrase}</td>
          <td>{frase.frase}</td>
        </tr>
      )
    );
  }
}