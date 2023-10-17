import React from "react";
import Modal from "react-modal";

// Define your Modal component
function PomodoroModal(props) {

    const customStyles = {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          zIndex: 1000,
        },
        content: {
          backgroundColor: "#0D2D5C",
          border: "1px solid #0D2D5C",
          borderRadius: "8px",
          padding: "0px",
          width: "80%",
          maxWidth: "600px",
          margin: "0 auto",
        },
      };

  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      style={customStyles}
    >
      <div style={{background: "#0D2D5C", width: '100%', height: '100%'}}>
        {props.children}
      </div>
    </Modal>
  );
}

export default PomodoroModal;