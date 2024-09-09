import { useState } from "react";
import Modal from "./Modal.tsx";
import "./App.css";

function App() {
    const [showModal, setShowModal] = useState(false);

    function onClose() {
        setShowModal(false);
    }

    function openModal() {
        setShowModal(true);
    }

    return (
        <div className="app">
            <h1>Testing Library Example</h1>
            <button onClick={openModal}>Show Modal</button>
            {showModal && <Modal onClose={onClose} />}
        </div>
    );
}

export default App;
