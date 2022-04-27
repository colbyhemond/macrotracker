

const Modal = ({modalId, children}) => {
    return (<>
        <input type="checkbox" id={modalId} className="modal-toggle"/>
        <label for={modalId} className="modal cursor-pointer">
            <label className="modal-box relative" for="">
            <label for={modalId} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                {children}
            </label>
        </label>
    </>)
}

export default Modal