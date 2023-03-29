import { Button, Modal } from "react-bootstrap"
import { FieldValues } from "react-hook-form"

interface ConfirmationModalProps {
    onHide?: () => void,
    show: boolean,
    values: FieldValues,
    isValid: boolean
}
const ConfirmationModal = (props: ConfirmationModalProps) => {
    return <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className={props.isValid ? "bg-primary" : "bg-danger"}>
        <Modal.Title id="contained-modal-title-vcenter" className="text-white mx-auto fs-6 fw-bold">
          Resumen del Formulario
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-4 bg-light row row-cols-1 row-cols-md-2 fs-6">
            <div className="fw-bold col">Nombre completo:</div>
            <div className="col">{props.values.fullname} </div>
        </div>
        <div className="p-4 row row-cols-1 row-cols-md-2 fs-6">
            <div className="fw-bold col">Fecha de Nacimiento:</div>
            <div className="col">{props.values.birthdate} </div>
        </div>
        <div className="p-4 bg-light row row-cols-1 row-cols-md-2 fs-6">
            <div className="fw-bold col">Pais: </div>
            <div className="col">{props.values.country} </div>
        </div>
        <div className="p-4 row row-cols-1 row-cols-md-2 fs-6">
            <div className="fw-bold col">Provincia: </div>
            <div className="col">{props.values.state} </div>
        </div>
        <div className="p-4 bg-light row row-cols-1 row-cols-md-2 fs-6">
            <div className="fw-bold col">Correo Electronico: </div>
            <div className="col">{props.values.email} </div>
        </div>
      </Modal.Body>
    </Modal>
}

export default ConfirmationModal