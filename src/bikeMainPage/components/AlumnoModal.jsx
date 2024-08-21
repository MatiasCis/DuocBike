import Modal from "react-modal";
import { useModalStore } from "../../hooks/useModalStore";
import { useAlumnoStore } from "../../hooks/useAlumnoStore";
import { useEffect, useState } from "react";
import { useMemo } from "react";
import Swal from "sweetalert2";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const AlumnoModal = () => {
  const { isAlumnoModalOpen, closeAlumnoModal } = useModalStore();
  const { activeAlumno, startSavingAlumno ,startDeletingAlumno} = useAlumnoStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    registerName: '',
    registerRut: '',
    registerCarrer: '',
    registerBrand: '',
    registerColor: '',
    registerID: '',
  });



  const alumnoClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.registerName.length > 0 ? '' : "is-invalid";
  }, [formValues.registerName, formSubmitted]);

  const onInputChanged = (event, field) => {
    setFormValues({
      ...formValues,
      [field]: event.target.value,
    });
  };

  useEffect(() => {
    if (activeAlumno !== null) {
      setFormValues({ ...activeAlumno });
    }
  }, [activeAlumno]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    
    if (formValues.registerName.length <= 0) return;
    
    Swal.fire({
      title: '¿Quiere guardar los cambios?',
  /*     showDenyButton: true, */
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
/*       denyButtonText: `Don't save`, */
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Guardado Correctamente!', '', 'success')
        startSavingAlumno(formValues);
        closeAlumnoModal();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })


    setFormSubmitted(false);
    
  };

  const onDelete = (event) => {
    event.preventDefault();
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-2',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: '¿Estás seguro que quieres eliminar?',
      text: "Esto no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Elimínalo!',
      cancelButtonText: 'No, Cancela',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Eliminado',
          'El alumno ha sido eliminado correctamente.',
          'success'
        );
        startDeletingAlumno();
        closeAlumnoModal();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El alumno no ha sido eliminado.',
          'error'
        );
      }
    });
  };



  const onCloseModal = () => {
    closeAlumnoModal();
  };


  return (
    <Modal
      isOpen={isAlumnoModalOpen}
      className="modal"
      overlayClassName="modal-fondo"
      onRequestClose={onCloseModal}
      style={customStyles}
    >
      <h1>Modificar Alumno</h1>
      <hr />
      <form className="container">
        <div className="form-group mb-2">
          <label>Nombre</label>
          <input
            type="text"
            className={`form-control ${alumnoClass}`}
            value={formValues.registerName}
            onChange={(event) => onInputChanged(event, "registerName")}
          />
        </div>
        <div className="form-group mb-2">
          <label>Rut</label>
          <input
            type="text"
            className={`form-control ${alumnoClass}`}
            value={formValues.registerRut}
            onChange={(event) => onInputChanged(event, "registerRut")}
          />
        </div>
        <div className="form-group mb-2">
          <label>Carrera</label>
          <input
            type="text"
            className={`form-control ${alumnoClass}`}
            value={formValues.registerCarrer}
            onChange={(event) => onInputChanged(event, "registerCarrer")}
          />
        </div>
        <div className="form-group mb-2">
          <label>Marca Bicicleta</label>
          <input
            type="text"
            className={`form-control ${alumnoClass}`}
            value={formValues.registerBrand}
            onChange={(event) => onInputChanged(event, "registerBrand")}
          />
        </div>
        <div className="form-group mb-2">
          <label>Color</label>
          <input
            type="text"
            className={`form-control ${alumnoClass}`}
            value={formValues.registerColor}
            onChange={(event) => onInputChanged(event, "registerColor")}
          />
        </div>
        <div className="form-group mb-2">
          <label>ID</label>
          <input
            type="text"
            className={`form-control ${alumnoClass}`}
            value={formValues.registerID}
            onChange={(event) => onInputChanged(event, "registerID")}
          />
        </div>
        <button type="submit" className="btn btn-primary me-2" onClick={onSubmit}>
          Guardar
        </button>
        <button  className="btn btn-danger me-2" onClick={onDelete}>
          Eliminar
        </button>
      </form>
    </Modal>
  );
};