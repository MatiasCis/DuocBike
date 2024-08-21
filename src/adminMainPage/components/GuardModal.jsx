import Modal from "react-modal";
import { useModalStore } from "../../hooks/useModalStore";
import { useEffect, useMemo, useState } from "react";
import { useGuardiaStore } from "../../hooks/useGuardiaStore";
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


export const GuardModal = () => {

  const { isGuardiaModalOpen, closeGuardiaModal } = useModalStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const { activeGuardia, startSavingGuardia, startDeletingGuardia } = useGuardiaStore();


  const [formValues, setFormValues] = useState({
    guardName: '',
    guardUser: '',
    guardPassword: '',

  });



  const guardiaClass = useMemo(() => {
    if (!formSubmitted) return "";
    return formValues.guardName.length > 0 ? '' : "is-invalid";
  }, [formValues.guardName, formSubmitted]);

  const onInputChanged = (event, field) => {
    setFormValues({
      ...formValues,
      [field]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (formValues.guardName.length <= 0) return;

    Swal.fire({
      title: '¿Quiere guardar los cambios?',
  /*     showDenyButton: true, */
      icon:'question',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
/*       denyButtonText: `Don't save`, */
    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire('Guardado Correctamente!', '', 'success')
        startSavingGuardia(formValues);
        closeGuardiaModal();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
    setFormSubmitted(false);

  };

  useEffect(() => {
    if (activeGuardia !== null) {
      setFormValues({ ...activeGuardia });
    }
  }, [activeGuardia]);



  const onDelete = (event) => {
    event.preventDefault();
  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success me-2', // Agrega una clase 'me-2' para el margen derecho
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
          'El Guardia ha sido eliminado correctamente.',
          'success'
        );
        startDeletingGuardia();
        closeGuardiaModal();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El Guardia no ha sido eliminado.',
          'error'
        );
      }
    });
  };


  const onCloseModal = () => {
    closeGuardiaModal();
  };



  return (
    <>
      <Modal
        isOpen={isGuardiaModalOpen}
        style={customStyles}
        className="modal"
        overlayClassName="modal-fondo"
        onRequestClose={onCloseModal}

      >
        <h1>Modificar Guardia</h1>
        <hr />
        <form className="container">
          <div className="form-group mb-2">
            <label>Nombre</label>
            <input
              type="text"
              className={`form-control ${guardiaClass}`}
              value={formValues.guardName}
              onChange={(event) => onInputChanged(event, "guardName")}
            />
          </div>
          <div className="form-group mb-2">
            <label>Usuario</label>
            <input
              type="text"
              className={`form-control ${guardiaClass}`}
              value={formValues.guardUser}
              onChange={(event) => onInputChanged(event, "guardUser")}
            />
          </div>
          <div className="form-group mb-2">
            <label>Contraseña</label>
            <input
              type="text"
              className={`form-control ${guardiaClass}`}
              value={formValues.guardPassword}
              onChange={(event) => onInputChanged(event, "guardPassword")}
            />
          </div>
          <button type="submit" className="btn btn-primary me-2" onClick={onSubmit}>
            Guardar
          </button>
          <button type="submit" className="btn btn-danger me-2" onClick={onDelete}>
            Eliminar
          </button>
        </form>
      </Modal>
    </>
  )
}
