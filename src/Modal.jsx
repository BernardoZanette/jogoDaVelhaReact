import './Modal.css';
import ModalBoot from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Modal = ({mostrar, vencedor, onJogarNovamente, modalFechado, setModalFechado}) => {
    const mostrarModal = mostrar ? "modal display-block" : "modal display-none";

    const fechar = () => {
      setModalFechado(true);
    }
    
    if (!modalFechado) {
      return (
        <div className={mostrarModal} >
            <ModalBoot.Header closeButton onClick={fechar}>
              <ModalBoot.Title>{vencedor} venceu!!</ModalBoot.Title>
            </ModalBoot.Header>
            <ModalBoot.Footer>
              <Button onClick={onJogarNovamente}>
                Jogar Novamente
              </Button>
            </ModalBoot.Footer>
         </div>
        );
    }
    return  <Button id="jogarNovamente" onClick={onJogarNovamente}> Jogar Novamente </Button>;
};
export default Modal;