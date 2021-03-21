import React from 'react';

import ModalWithCalcForm from '../ModalWithCalcForm/ModalWithCalcForm';

function App() {

  const MODAL_BUTTON_TEXT = 'Налоговый вычет';

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleToggleModalIsOpen = () => {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <div className="app">
      <button
        className="app__modal-button"
        onClick={handleToggleModalIsOpen}
      >
        {MODAL_BUTTON_TEXT}
      </button>
      {isModalOpen && (
        <ModalWithCalcForm
          isOpen={isModalOpen}
          onClose={handleToggleModalIsOpen}
        />
      )}
    </div>
  );
}

export default App;
