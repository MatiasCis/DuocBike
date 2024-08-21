
import Swal from 'sweetalert2';
import { useAuthStore, useRegister } from '../../hooks';
import React, { useState } from 'react';
import '../styles/RegistrationBike.css'


const registerFormFields = {
    registerName: '',
    registerRut: '',
    registerCarrer: '',
    registerBrand: '',
    registerColor: '',
    registerID: '',
}


export const RegistrationBike = () => {
    function enviarFormulario(){
        var nombre = document.getElementById('name')
        var rut = document.getElementById('rut')
        var carrera = document.getElementById('carrera')
        var marca = document.getElementById('marca')
        var color = document.getElementById('color')
        var id = document.getElementById('id')
        var btn = document.getElementById('btn')
        

        var error1 = document.getElementById('error1')
        var error2 = document.getElementById('error2')
        var error3 = document.getElementById('error3')
        var error4 = document.getElementById('error4')
        var error5 = document.getElementById('error5')
        var error6 = document.getElementById('error6')

        var mensajesError1 = []
        var mensajesError2 = []
        var mensajesError3 = []
        var mensajesError4 = []
        var mensajesError5 = []
        var mensajesError6 = []

        var form = document.getElementById('form')
        let deshabilitar = false;

        /*VALIDACION NOMBRE*/
        if (nombre.value === null || nombre.value === '') {
            mensajesError1.push('Ingresa tu nombre. <br>');
            deshabilitar = true;
        } else if (!/^[a-zA-Z]+$/.test(nombre.value)) {
            mensajesError1.push('Solo debe contener letras. <br>');
            deshabilitar = true;
        } else if (nombre.value.length > 0 && nombre.value.length < 3) {
            mensajesError1.push('Debe ser más largo. <br>');
            deshabilitar = true;
        }
        /*VALIDACION NOMBRE*/

        /*VALIDACION RUT*/
        if (rut.value === null || rut.value === '') {
            mensajesError2.push('Ingresa un RUT. <br>');
            deshabilitar = true;
        } else if (!/^[0-9]+[0-9kK]$/.test(rut.value) || /-/.test(rut.value)) {
            mensajesError2.push('El RUT debe contener solo números y la "k" final, sin guiones. <br>');
            deshabilitar = true;
        } else if (rut.value.length < 9) {
            mensajesError2.push('El RUT debe tener al menos 9 dígitos. <br>');
            deshabilitar = true;
        }
        /*VALIDACION RUT*/

        /*VALIDACION CARRERA*/
        if(carrera.value === null || carrera.value === ''){
            mensajesError3.push('Ingresa una carrera. <br>')
            deshabilitar=true;
        }
        else if (!/^[a-zA-Z]+$/.test(carrera.value)) {
            mensajesError3.push('Solo debe contener letras. <br>');
            deshabilitar = true;
        } else if (carrera.value.length > 0 && carrera.value.length < 3) {
            mensajesError3.push('Debe ser más largo. <br>');
            deshabilitar = true;
        }
        /*VALIDACION CARRERA*/

        /*VALIDACION MARCA*/
        if(marca.value === null || marca.value === ''){
            mensajesError4.push('Ingresa una marca. <br>')
            deshabilitar=true;
        }
        else if (!/^[a-zA-Z]+$/.test(marca.value)) {
            mensajesError4.push('Solo debe contener letras. <br>');
            deshabilitar = true;
        } else if (marca.value.length > 0 && marca.value.length < 3) {
            mensajesError4.push('Debe ser más largo. <br>');
            deshabilitar = true;
        }
        /*VALIDACION MARCA*/

        /*VALIDACION COLOR*/
        if(color.value === null || color.value === ''){
            mensajesError5.push('Ingresa un color. <br>')
            deshabilitar=true;
        }
        else if (!/^[a-zA-Z]+$/.test(color.value)) {
            mensajesError5.push('Solo debe contener letras. <br>');
            deshabilitar = true;
        } else if (color.value.length > 0 && color.value.length < 3) {
            mensajesError5.push('Debe ser más largo. <br>');
            deshabilitar = true;
        }
        /*VALIDACION COLOR*/

        /*VALIDACION ID*/
        if(id.value === null || id.value === ''){
            mensajesError6.push('Ingresa una ID. <br>')
            deshabilitar=true;
        }
        if(id.value.length >0 && id.value.length <1){
            mensajesError.push('La ID debe ser mas largo. <br>')
            deshabilitar=true;
        }
        if(id.value <0){
            mensajesError6.push('Tiene que ser positivo. <br>')
            deshabilitar=true;
        }
        /*VALIDACION ID*/
        error1.innerHTML= mensajesError1.join('')
        error2.innerHTML= mensajesError2.join('')
        error3.innerHTML= mensajesError3.join('')
        error4.innerHTML= mensajesError4.join('')
        error5.innerHTML= mensajesError5.join('')
        error6.innerHTML= mensajesError6.join('')

        form.addEventListener("keyup", enviarFormulario)
        if(deshabilitar === true){
            btn.disabled = true;
        }
        else{
            btn.disabled = false;
        }        
    }
    const { registerName, registerRut, registerCarrer, registerBrand, registerColor, registerID, onInputChange: onRegisterInputChange,onResetForm } = useRegister(registerFormFields);
    const { startRegisterAlumno } = useAuthStore();
    const registerSubmit = (event) => {
        event.preventDefault();
        Swal.fire({
          title: '¿Desea agregar a este alumno?',
          icon: 'question',
/*           showDenyButton: true, */
          showCancelButton: true, 
          confirmButtonText: 'Agregar',
   /*        denyButtonText: `No guardar`, */
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire('Agregado Correctamente', '', 'success')
            startRegisterAlumno({ 
                registerName:registerName, 
                registerRut:registerRut,
                registerCarrer: registerCarrer, 
                registerBrand:registerBrand, 
                registerColor:registerColor, 
                registerID:registerID })
                onResetForm();

          } else if (result.isDenied) {
            Swal.fire('No agregado', '', 'info')
          }
        })
    }
    return (
        <div className='fondo3'>
            <div className='body3'>
                <div className='container3'>
                    <h2 className='nuevoal'>Nuevo Alumno</h2>
                    <form className='form3' onSubmit={registerSubmit} id='form'>
                        {/* Nombre */}
                        <div className="form-control3">
    
                            <input type='text'
                            placeholder='Nombre' 
                             className='input3' 
                             id='name'
                              minLength={1} 
                              maxLength={15} 
                      
                            name="registerName"
                            value={registerName}
                            onChange={onRegisterInputChange} onClick={enviarFormulario}></input>
                            <div id='error1' className='error'></div>
                        </div>
                        

                        {/* Rut */}
                        <div className="form-control3">
                            
                            <input type='text' placeholder='Rut: 123456785' className='input3' id='rut' maxLength={9}
                            name="registerRut"
                            value={registerRut}
                            onChange={onRegisterInputChange} onClick={enviarFormulario}></input>
                            <div id='error2' className='error'></div>
                        </div>

                        {/* Carrera */}
                        <div className="form-control3">
                            
                            <input type='text' placeholder='Carrera' className='input3' id='carrera' minLength={1} maxLength={15}
                            name="registerCarrer"
                            value={registerCarrer}
                            onChange={onRegisterInputChange} onClick={enviarFormulario}></input>
                            <div id='error3' className='error'></div>
                        </div>

                        {/* Marca */}
                        <div className="form-control3">
                            
                            <input type='text' placeholder='Marca' className='input3' id='marca' minLength={1} maxLength={15}
                            name="registerBrand"
                            value={registerBrand}
                            onChange={onRegisterInputChange} onClick={enviarFormulario}></input>
                            <div id='error4' className='error'></div>
                        </div>

                        {/* Color */}
                        <div className="form-control3">
                            
                            <input type='text' placeholder='Color' className='input3' id='color' minLength={1} maxLength={10}
                            name="registerColor"
                            value={registerColor}
                            onChange={onRegisterInputChange} onClick={enviarFormulario}></input>
                            <div id='error5' className='error'></div>
                        </div>

                        {/* ID */}
                        <div className="form-control3">

                            <input type='number' placeholder='ID' className='input3' id='id'
                            name="registerID"
                            value={registerID}
                            onChange={onRegisterInputChange} onClick={enviarFormulario}></input>
                            <div id='error6' className='error'></div>
                        </div>

                        {/* Boton Registrar */}
                        <button className='btn' value="Registrar" id='btn' disabled>Registrar</button>
                    </form>
                    <img className="logo2" src="../assets/LogoDuoc.png"/>
                </div>
            </div>
        </div>
    )
}
