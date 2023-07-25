// ModalContext.js
import React, { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isAddModalVisible, setIsAddModal] = useState(false);
  const [isEditModalVisible, setIsEditModal] = useState(false);

  const showAddModal = () => {
    setIsAddModal(true);
  };

  const hideAddModal = () => {
    setIsAddModal(false);
  };
  const showEditModal = () => {
    setIsEditModal(true);
  };

  const hideEditModal = () => {
    setIsEditModal(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isAddModalVisible,
        showAddModal,
        hideAddModal,
        isEditModalVisible,
        showEditModal,
        hideEditModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
