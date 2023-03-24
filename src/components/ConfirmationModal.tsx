import { Button, Modal } from "react-bootstrap"

interface ConfirmationModalProps {
    onHide?: () => void,
    show: boolean
}
const ConfirmationModal = (props: ConfirmationModalProps) => {
    return <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Formulario Completado!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-4 bg-light row fs-6">
            <div className="fw-bold col">Nombre completo:</div>
            <div className="fw-bold col">Catalina Fernandez </div>
        </div>
        <div className="p-4 row fs-6">
            <div className="fw-bold col">Fecha de Nacimiento:</div>
            <div className="fw-bold col">Catalina Fernandez </div>
        </div>
        <div className="p-4 bg-light row fs-6">
            <div className="fw-bold col">Pais: </div>
            <div className="fw-bold col">Catalina Fernandez </div>
        </div>
        <div className="p-4 row fs-6">
            <div className="fw-bold col">Provincia: </div>
            <div className="fw-bold col">Catalina Fernandez </div>
        </div>
        <div className="p-4 bg-light row fs-6">
            <div className="fw-bold col">Correo Electronico: </div>
            <div className="fw-bold col">Catalina Fernandez </div>
        </div>
      </Modal.Body>
    </Modal>
}

export default ConfirmationModal