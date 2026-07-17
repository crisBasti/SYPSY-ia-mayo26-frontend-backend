import "./../../styles/smartActionModal.css";

function SmartActionModal({

    open,

    title,

    children,

    onClose,

    onConfirm,

    confirmText = "Guardar"

}) {

    if (!open) return null;

    return (

        <div className="smart-overlay">

            <div className="smart-modal">

                <div className="smart-header">

                    <h2>{title}</h2>

                    <button
                        className="smart-close"
                        onClick={onClose}
                    >
                        ✕

                    </button>

                </div>

                <div className="smart-body">

                    {children}

                </div>

                <div className="smart-footer">

                    <button

                        className="smart-cancel"

                        onClick={onClose}

                    >

                        Cancelar

                    </button>

                    <button

                        className="smart-confirm"

                        onClick={onConfirm}

                    >

                        {confirmText}

                    </button>

                </div>

            </div>

        </div>

    );

}

export default SmartActionModal;