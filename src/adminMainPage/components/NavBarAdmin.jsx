import { NavLink } from "react-router-dom"
import { useAuthStore } from "../../hooks";
import '../styles/NavBarAdmin.css'


export const NavBarAdmin = () => {


  const  {startLogout,user}=useAuthStore();
    return (
        <div className="navbar bg-light mb-4 px-4">
          <span className="navbar-brand">
          <i className="fa-solid fa-person-military-pointing"></i>
          {user.name}
          </span>
          <div className="nav-links">
          <NavLink  className="nav-link"  to="/ingresoAdmin">
            Ingresar alumno
          </NavLink>
          <NavLink  className="nav-link"  to="/listaIngresoAdmin">
            Lista Ingresos
          </NavLink>
        
          <NavLink className="nav-link"  to="/administracion">
            Nuevo Guardia
          </NavLink>
          <NavLink  className="nav-link"  to="/listAdmin">
            Gestion Alumnos
          </NavLink>
        
          <NavLink  className="nav-link"  to="/listGuard">
            Gestion Guardias
          </NavLink>
          <NavLink  className="nav-link"  to="/AdminVisita">
            Gestion Visitas
          </NavLink>

          </div>
     
    
          <button className="btn btn-outline-danger"onClick={startLogout}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
          </button>
        </div>
      )
}
