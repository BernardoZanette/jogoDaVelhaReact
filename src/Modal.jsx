import './Modal.css';

const Modal = ({mostrar}) => {
    const mostrarModal = mostrar ? "modal display-block" : "modal display-none";
    return (
    <div className={`${mostrarModal} fade`}>
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Modal Header</h4>
            </div>
            <div class="modal-body">
            <p>Some text in the modal.</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            </div>
        </div>
        </div>
     </div>
    );
};
export default Modal;