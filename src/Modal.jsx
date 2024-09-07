import "./Modal.css";

export default function Modal({
    title = "Modal",
    text = "Are you sure?",
    onClose,
}) {
    return (
        <div className="Modal">
            <div className="Modal-content">
                <button
                    className="Modal-close"
                    onClick={onClose}
                    aria-label="Close"
                >
                    Close
                </button>
                <h2>{title}</h2>
                <p>{text}</p>
                <div className="Modal-actions">
                    <button>Ok</button>
                    <button>Cancel</button>
                </div>
            </div>
        </div>
    );
}
