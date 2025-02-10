const Modal = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{ background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Confirm Deletion</h5>
                        {/* <button type="button" className="btn-close" onClick={onCancel}></button> */}
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this movie?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onCancel}>
                            Cancel
                        </button>
                        <button type="button" className="btn btn-danger" onClick={onConfirm}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
