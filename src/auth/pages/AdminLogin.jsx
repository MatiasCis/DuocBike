import { useEffect } from "react";
import { useAuthStore, useRegister } from "../../hooks";
import Swal from "sweetalert2";
import './Admin.css'
import './Login.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const loginAdminFormFields={
    adminUser:'',
    adminPassword:'',
}



export const AdminLogin = () => {
    function validacion(){
        var usuario = document.getElementById('usuario')
        var contraseña = document.getElementById('contraseña')

        var error1 = document.getElementById('error1')
        var error2 = document.getElementById('error2')
        var mensajesError1 = []
        var mensajesError2 = []

        var form = document.getElementById('form')
        let deshabilitar = false;

        /*VALIDACION USUARIO*/
        if (usuario.value === null || usuario.value === '') {
            mensajesError1.push('Ingresa tu usuario. <br>');
            deshabilitar = true;
        } else if (!/^[a-zA-Z]+$/.test(usuario.value)) {
            mensajesError1.push('Solo debe contener letras. <br>');
            deshabilitar = true;
        } else if (usuario.value.length > 0 && usuario.value.length < 3) {
            mensajesError1.push('Debe ser más largo. <br>');
            deshabilitar = true;
        }
        /*VALIDACION USUARIO*/
        /*VALIDACION CONTRASEÑA*/
        if(contraseña.value === null || contraseña.value === ''){
            mensajesError2.push('Ingresa tu contraseña. <br>')
            deshabilitar=true;
        }
        if(contraseña.value.length >0 && contraseña.value.length <2){
            mensajesError2.push('Debe ser mas larga. <br>')
            deshabilitar=true;
        }
        /*VALIDACION CONTRASEÑA*/

        if(deshabilitar === true){
            btn.disabled = true;
        }
        else{
            btn.disabled = false;
        }

        error1.innerHTML= mensajesError1.join('')
        error2.innerHTML= mensajesError2.join('')
        form.addEventListener("keyup", validacion)
    }

    const {startLoginAdmin,errorMessage}=useAuthStore();
    const {adminUser,adminPassword,onInputChange:onLoginAdminInputChange}=useRegister(loginAdminFormFields);
    const loginAdminSubmit = (event)=>{
        event.preventDefault();
        startLoginAdmin({adminUser:adminUser,adminPassword:adminPassword});
    }


    useEffect(() => {
      if(errorMessage !==undefined){
        Swal.fire('Error en credenciales',errorMessage,'error')
      }
    }, [errorMessage])

    return (
        <div className="fondo2">
            <div className="body2">
                <div className="container2">
                    {/* Imagen */}
                    <img className="img2" src="../assets/logo.png"></img>
                    <h2 className="letraadmi">Administrador</h2>

                    <form className="form2" onSubmit={loginAdminSubmit} id="form">
                        {/* Usuario */}
                        <div className="form-control2">
                            <FontAwesomeIcon icon={faUser} className='icono2'></FontAwesomeIcon>
                            <input type='text' placeholder='Usuario' className='input' id="usuario"
                            name="adminUser"
                            value={adminUser}
                            onChange={onLoginAdminInputChange} onClick={validacion}></input>
                            <div id='error1' className='error2'></div>
                        </div>

                        {/* Contraseña */}
                        <div className='form-control2'>
                            <FontAwesomeIcon icon={faLock} className='icono2'></FontAwesomeIcon>
                            <input type='password' className='input' placeholder='Contraseña' id="contraseña"
                            name="adminPassword"
                            value={adminPassword}
                            onChange={onLoginAdminInputChange} onClick={validacion}></input>
                            <div id='error2' className='error2'></div>
                        </div>

                        {/* Boton Entrar */}
                        <button className='btn' value="Entrar" id="btn" disabled>Entrar</button>
                        <h1 className='copy2'>Copyright ©2023 PipeloveINC.</h1>
                        <img className="logoadmin" src="../assets/LogoDuoc.png"/>
                    </form>
                </div>
            </div>
        </div>
    )
}
