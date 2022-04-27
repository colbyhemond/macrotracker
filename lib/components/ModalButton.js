

const ModalButton = ({modalId, children}) => {
    return (<>
        <label htmlFor={modalId} className="btn modal-button">{children}</label>
    </>)
}

export default ModalButton