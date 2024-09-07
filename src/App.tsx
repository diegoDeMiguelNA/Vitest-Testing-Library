import { useState } from "react";
import Modal from "./Modal.tsx";
import "./App.css";

function App() {
    const [showModal, setShowModal] = useState(false);

    function onClose() {
        setShowModal(false);
    }

    return (
        <div className="app">
            <h1>Testing Library example</h1>
            <button onClick={() => setShowModal(true)}>Show Modal</button>
            {showModal && <Modal onClose={onClose} />}
        </div>
    );
}

export default App;
