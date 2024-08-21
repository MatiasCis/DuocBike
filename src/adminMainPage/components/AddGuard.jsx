import { useAuthStore, useRegister } from "../../hooks";
import "../styles/AddGuard.css";
import Swal from "sweetalert2";

const guardFormFields = {
  guardName: "",
  guardUser: "",
  guardPassword: "",
};

export const AddGuard = () => {

  function validacion(){
    var nombre = document.getElementById('nombre')
    var usuario = document.getElementById('usuario')
    var contraseña = document.getElementById('contraseña')

    var error1 = document.getElementById('error1')
    var error2 = document.getElementById('error2')
    var error3 = document.getElementById('error3')
    var mensajesError1 = []
    var mensajesError2 = []
    var mensajesError3 = []

    var form = document.getElementById('form')
    let deshabilitar = false;

    

    /*VALIDACION NOMBRE*/
    if (nombre.value === null || nombre.value === '') {
      mensajesError1.push('Ingresa un nombre. <br>');
      deshabilitar = true;
    } else if (!/^[a-zA-Z]+$/.test(nombre.value)) {
        mensajesError1.push('Solo debe contener letras. <br>');
        deshabilitar = true;
    } else if (nombre.value.length > 0 && nombre.value.length < 3) {
        mensajesError1.push('Debe ser más largo. <br>');
        deshabilitar = true;
    }
    /*VALIDACION NOMBRE*/

    /*VALIDACION USUARIO*/
    if (usuario.value === null || usuario.value === '') {
        mensajesError2.push('Ingresa un usuario. <br>');
        deshabilitar = true;
    }else if (usuario.value.length > 0 && usuario.value.length < 3) {
        mensajesError2.push('Debe ser más largo. <br>');
        deshabilitar = true;
    }
    /*VALIDACION USUARIO*/
    /*VALIDACION CONTRASEÑA*/
    if(contraseña.value === null || contraseña.value === ''){
        mensajesError3.push('Ingresa una contraseña. <br>')
        deshabilitar=true;
    }
    if(contraseña.value.length >0 && contraseña.value.length <2){
        mensajesError3.push('Debe ser mas larga. <br>')
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
  error3.innerHTML= mensajesError3.join('')
  form.addEventListener("keyup", validacion)
}



  const {
    guardName,
    guardUser,
    guardPassword,
    onInputChange: onGuardInputChange,
  } = useRegister(guardFormFields);
  const { startRegisterGuard } = useAuthStore();
    

  const registerSubmit = (event) => {
    event.preventDefault();


    Swal.fire({
      title: "¿Desea agregar a este guardia?",
      icon: "question",
      /*           showDenyButton: true, */
      showCancelButton: true,
      confirmButtonText: "Agregar",
      /*        denyButtonText: `No guardar`, */
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Agregado Correctamente", "", "success");
        startRegisterGuard({
          guardName: guardName,
          guardUser: guardUser,
          guardPassword: guardPassword,
        });
      } else if (result.isDenied) {
        Swal.fire("No agregado", "", "info");
      }
    });
  };

  return (
    <>
      <div className="fondoGuard">
        <div className="body6">
          <div className="container add-container">
            <div className="row">
              <div className="col-md-6 add-form-1">
                <h1 className="titulo">Ingresar Guardia</h1>
                <form onSubmit={registerSubmit} id="form">
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      className=" form-control-add"
                      placeholder="Nombre"
                      name="guardName"
                      value={guardName}
                      id="nombre"
                      onChange={onGuardInputChange}
                      onClick={validacion}
                    />
                    <div id='error1' className='error2'></div>
                  </div>
                  
                  <div className="form-group mb-2">
                    <input
                      type="text"
                      className=" form-control-add"
                      placeholder="Usuario"
                      name="guardUser"
                      value={guardUser}
                      id="usuario"
                      onChange={onGuardInputChange}
                      onClick={validacion}
                    />
                    <div id='error2' className='error2'></div>
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control-add"
                      placeholder="contraseña"
                      name="guardPassword"
                      value={guardPassword}
                      id="contraseña"
                      onChange={onGuardInputChange}
                      onClick={validacion}
                    />
                    <div id='error3' className='error2'></div>
                  </div>
                  <div className="form-group mb-2">
                  <button className="btnAddGuard" value="Registrar" id='btn' disabled>Registrar</button>
                  </div>
                  <img className="logoguard" src="../assets/LogoDuoc.png"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
