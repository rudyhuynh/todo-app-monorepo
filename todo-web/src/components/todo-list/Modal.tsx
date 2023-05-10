import { ReactNode } from "react";

type ModalPropTypes = {
  className: string;
  children: ReactNode;
};

export const Modal = ({ className, children }: ModalPropTypes) => {
  return (
    <div className={className}>
      <div className="modal-overlay"></div>
      {children}
    </div>
  );
};
