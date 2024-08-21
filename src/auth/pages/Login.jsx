import { useEffect } from 'react';
import { useAuthStore, useRegister } from '../../hooks'
import './Login.css'
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';


const loginFormFields={
    loginUser:'',
    loginPassword:'',
}


export const Login = () => {
    const {startLogin,errorMessage}=useAuthStore();
    function validacion(){
        var usuario = document.getElementById('usuario')
        var contraseña = document.getElementById('contraseña')
        var btn = document.getElementById('btn')
        
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

    const {loginUser,loginPassword,onInputChange:onLoginInputChange}=useRegister(loginFormFields);

    const loginSubmit = (event)=>{
        event.preventDefault();
 
        startLogin({guardUser:loginUser,guardPassword:loginPassword});
    }


    useEffect(() => {
      if(errorMessage !==undefined){
        Swal.fire('Error en credenciales',errorMessage,'error')
      }
    
    }, [errorMessage])
    
  return (
    <div className='fondo'>
        <div className='body1'>
            <div className='container1'>
                {/* imagen */}
                <img className='img1' src="../assets/logo.png"/>
                <h2 className='h2'>DuocBike</h2>
                <form className='form1' onSubmit={loginSubmit} id='form'>
                    {/* Usuario */}
                    <div className='form-control1'>
                        <FontAwesomeIcon icon={faUser} className='icono1'></FontAwesomeIcon>
                        <input type='text' placeholder='Usuario' className='input' maxLength={15} id='usuario' minLength={1}
                        name='loginUser' 
                        value={loginUser}
                        onChange={onLoginInputChange} 
                        onClick={validacion}
                        ></input>
                        <div id='error1' className='error2'></div>
                    </div>
                    {/* Contraseña */}
                    <div className='form-control1'>
                        <FontAwesomeIcon icon={faLock} className='icono1'></FontAwesomeIcon>
                        <input type='password' className='input' placeholder='Contraseña' name='loginPassword' value={loginPassword} onChange={onLoginInputChange} maxLength={15} id='contraseña' minLength={2} onClick={validacion}></input>
                        <div id='error2' className='error2'></div>
                    </div>
                    {/* Boton Entrar */}
                    <button className='btn' value="Entrar" id='btn' disabled>Entrar</button>
                    <h1 className='copy'>Copyright ©2023 PipeloveINC.</h1>
                    <img className="logo" src="../assets/LogoDuoc.png"/>
                </form>
            </div>
        </div>
    </div>
)
}

