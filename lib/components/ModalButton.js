

const ModalButton = ({modalId, children}) => {
    return (<>
        <label for={modalId} className="btn modal-button">{children}</label>
    </>)
}

export default ModalButton