import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { useClickAway } from "react-use";
import CloseIcon from "../../atoms/vectors/CloseIcon";
// import "./ModalStyles.scss";

const Modal = ({
  children,
  closeModal = false,
  mxWt,
  mxHt,
  modalTitle,
  handleCloseModal = () => {},
}: {
  children: ReactNode;
  closeModal: boolean;
  mxWt?: string;
  mxHt?: string;
  modalTitle: string;
  handleCloseModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const handleCloseModal2 = () => {
    handleCloseModal(false);
  };
  return (
    <div className={clsx("modal-container", closeModal ? "flex" : "hidden")}>
      <div
        className={clsx(
          "modal-container bg-[#00000050]",
          closeModal ? "flex" : "hidden"
        )}
        onClick={handleCloseModal2}
      ></div>
      <div
        className={clsx(
          "modal scrollbar-hide",
          mxWt || "md:max-w-[85%] lg:max-w-[60%]",
          mxHt || "max-h-screen md:max-h-[80%]"
        )}
      >
        <div className="flex justify-between items-center border-b pb-2">
          {modalTitle ? <h2 className="modal-heading">{modalTitle}</h2> : null}
          <span className="cursor-pointer" onClick={handleCloseModal2}>
            <CloseIcon />
          </span>
        </div>
        <div className="flex-1 overflow-y-auto scrollbar-hide mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
