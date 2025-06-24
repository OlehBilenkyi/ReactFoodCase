// src/components/OrderFeatures/ModalManager/ModalManager.jsx
import React, { createContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import DatePickerModal from "../DatePickerModal/DatePickerModal";

export const MODAL_TYPES = {
  DATE_PICKER: "date-picker",
};

export const ModalContext = createContext({
  openModal: () => console.warn("No modal provider"),
  closeModal: () => console.warn("No modal provider"),
  closeAllModals: () => console.warn("No modal provider"),
  openModals: new Set(),
  modalProps: {},
});

const ModalProvider = ({ children }) => {
  const [openModals, setOpenModals] = useState(new Set());
  const [modalProps, setModalProps] = useState({});

  const openModal = useCallback((modalId, props = {}) => {
    if (!Object.values(MODAL_TYPES).includes(modalId)) {
      console.error(`Unknown modal type: ${modalId}`);
      return;
    }
    setModalProps((prev) => ({
      ...prev,
      [modalId]: {
        ...props,
        onClose: props.onClose || (() => closeModal(modalId)),
      },
    }));
    setOpenModals((prev) => new Set(prev).add(modalId));
    document.body.classList.add("modalOpen");
  }, []);

  const closeModal = useCallback(
    (modalId) => {
      setOpenModals((prev) => {
        const nxt = new Set(prev);
        nxt.delete(modalId);
        return nxt;
      });
      if (modalProps[modalId]?.onClose) {
        modalProps[modalId].onClose();
      }
      if (openModals.size === 1) {
        document.body.classList.remove("modalOpen");
      }
    },
    [modalProps, openModals]
  );

  const closeAllModals = useCallback(() => {
    openModals.forEach((modalId) => {
      if (modalProps[modalId]?.onClose) {
        modalProps[modalId].onClose();
      }
    });
    setOpenModals(new Set());
    document.body.classList.remove("modalOpen");
  }, [openModals, modalProps]);

  const renderModalComponent = useCallback(
    (modalId) => {
      const currentProps = modalProps[modalId] || {};
      switch (modalId) {
        case MODAL_TYPES.DATE_PICKER:
          return <DatePickerModal {...currentProps} />;
        default:
          console.warn(`No renderer for modal type: ${modalId}`);
          return null;
      }
    },
    [modalProps]
  );

  const contextValue = {
    openModals,
    openModal,
    closeModal,
    closeAllModals,
    modalProps,
    MODAL_TYPES,
  };

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      {Array.from(openModals).map((modalId) => (
        <div
          key={modalId}
          className="modalOverlay"
          onClick={() => closeModal(modalId)}
        >
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            {renderModalComponent(modalId)}
          </div>
        </div>
      ))}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalProvider;
