// ModalContext.js
import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isAddModalVisible, setIsAddModal] = useState(false);

  const showAddModal = () => {
    setIsAddModal(true);
  };

  const hideAddModal = () => {
    setIsAddModal(false);
  };

  return (
    <ModalContext.Provider
      value={{ isAddModalVisible, showAddModal, hideAddModal }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
