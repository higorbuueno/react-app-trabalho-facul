import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./shared/navbar/navbar";
import Home from "./pages/home/home-page";
import Error from "./pages/error/error-page";
import Formatador from "./pages/formatador/formatador-page";
import ComoFunciona from "./pages/como-funciona/como-funciona-page";
import "./routes.css";
import Consultador from "./pages/consultador/consultador-page";
import MinhasConsultas from "./pages/minhas-consultas/minhas-consultas";
import Login from "./pages/login/login";
import Registrarse from "./pages/registrarse/registrarse";

function RoutesApp() {
  return (
    <BrowserRouter>
      <div className="header">
        <Header />
      </div>
      <div className="body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="react-app" element={<Home />} /> {/** I've to put react-app before link because of gh-pages */}
          <Route path="react-app/como-funciona" element={<ComoFunciona />} /> {/** I've to put react-app before link because of gh-pages*/}
          <Route path="react-app/formatador" element={<Formatador />} /> {/** I've to put react-app before link because of gh-pages*/}
          <Route path="react-app/consultador" element={<Consultador />} /> {/** I've to put react-app before link because of gh-pages*/}
          <Route path="react-app/minhas-consultas" element={<MinhasConsultas />} /> {/** I've to put react-app before link because of gh-pages*/}
          <Route path="react-app/login" element={<Login />} /> {/** I've to put react-app before link because of gh-pages*/}
          <Route path="react-app/login/registrarse" element={<Registrarse />} /> {/** I've to put react-app before link because of gh-pages*/}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default RoutesApp;
