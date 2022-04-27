

const Modal = ({modalId, children}) => {
    return (<>
        <input type="checkbox" id={modalId} class="modal-toggle"/>
        <label for={modalId} class="modal cursor-pointer">
            <label class="modal-box relative" for="">
            <label for={modalId} class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                {children}
            </label>
        </label>
    </>)
}

export default Modal