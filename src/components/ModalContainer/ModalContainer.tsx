import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./style.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function ModalContainer({
  open,
  onClose,
  children,
}: Props): any {
  useEffect(() => {
    const closeOnEsc = (e: { charCode: any; keyCode: any }) => {
      if ((e.charCode || e.keyCode) === 27) {
        onClose();
      }
    };

    document.addEventListener("keydown", closeOnEsc, false);
    return () => {
      document.removeEventListener("keydown", closeOnEsc, false);
    };
  }, [onClose]);

  return open
    ? createPortal(
        <div
          className="modalContainer"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          <div
            className="modalMain"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </div>
        </div>,
        document.body,
      )
    : null;
}
