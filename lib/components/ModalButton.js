

const ModalButton = ({modalId, children}) => {
    return (<>
        <label for={modalId} class="btn modal-button">{children}</label>
    </>)
}

export default ModalButton