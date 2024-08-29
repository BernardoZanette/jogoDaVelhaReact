import './Modal.css';

const Modal = ({mostrar}) => {
    const mostrarModal = mostrar ? "modal display-block" : "modal display-none";
    return (
    <div className={mostrarModal}>
        <div><h1>IVOANSDKLVASKL</h1></div> 
        {/* usar bootstrap */}
    </div>
    );
};
export default Modal;