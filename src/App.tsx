import { useState } from "react";
import "./App.css";
import Modal from "./Modal.tsx";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [trackUserAction, setTrackUserAction] = useState(
    "Waiting for user interaction"
  );

  function onConfirm() {
    setShowModal(false);
    setTrackUserAction("Action Successful");
  }

  function onClose() {
    setShowModal(false);
  }

  function onCancel() {
    setShowModal(false);
    setTrackUserAction("Action Canceled");
  }

  function openModal() {
    setShowModal(true);
  }

  return (
    <div className="app">
      {trackUserAction && <p>{trackUserAction}</p>}
      <h1>Testing Library Example</h1>
      <button onClick={openModal}>Show Modal</button>
      {showModal && (
        <Modal onClose={onClose} onConfirm={onConfirm} onCancel={onCancel} />
      )}
    </div>
  );
}

export default App;
