import './Modal.css';
import ModalBoot from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Modal = ({mostrar, vencedor}) => {
    const mostrarModal = mostrar ? "modal display-block" : "modal display-none";
    return (
    <div className={mostrarModal} >
        <ModalBoot.Header closeButton>
          <ModalBoot.Title>{vencedor} venceu!!</ModalBoot.Title>
        </ModalBoot.Header>
        <ModalBoot.Footer>
          <Button>
            Jogar Novamente
          </Button>
        </ModalBoot.Footer>
     </div>
    );
};
export default Modal;