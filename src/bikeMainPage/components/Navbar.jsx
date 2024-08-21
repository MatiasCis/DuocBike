import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hooks";
import '../styles/NavBar.css'

export const Navbar = () => {
  const { startLogout, user } = useAuthStore();

  return (
    <div className="navbar bg-light mb-4 px-4">
      <div className="navbar-brand">
        <i className="fa-solid fa-person-military-pointing"></i>
        &nbsp;
        <span>{user.name}</span>
      </div>

      <div className="nav-links">
        <NavLink className="nav-link" to="/ingreso">
          Ingreso Alumno
        </NavLink>
        <NavLink className="nav-link" to="/ingresados">
          Lista Ingresos
        </NavLink>
        <NavLink className="nav-link" to="/registrar">
          Nuevo Alumno
        </NavLink>
        <NavLink className="nav-link" to="/list">
          Lista Alumnos
        </NavLink>
        <NavLink className="nav-link" to="/visitas">
          Visitas
        </NavLink>


      </div>

      <button className="btn btn-outline-danger" onClick={startLogout}>
        <i className="fas fa-sign-out-alt"></i>
        &nbsp;
        <span>Salir</span>
      </button>
    </div>
  );
};