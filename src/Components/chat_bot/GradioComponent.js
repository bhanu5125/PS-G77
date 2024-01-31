// GradioComponent.js
import React from 'react';
import Modal from './Modal';
import './GradioComponent.css';

const GradioComponent = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div id="gradio-container">
        <iframe
          title="Gradio Chatbot"
          src="https://debdf4184c53e26c59.gradio.live"
          width="100%"
          height="100%"
        ></iframe>
      </div>
    </Modal>
  );
};

export default GradioComponent;
