import clsx from "clsx";
import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import { useClickAway } from "react-use";
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
  // const modalRef = useRef(null);
  // useClickAway(modalRef, () => {
  //   handleCloseModal((prev) => !prev);
  // });

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
          mxWt || "max-w-[60%]",
          mxHt || "max-h-[32.06rem]"
        )}
      >
        {modalTitle ? <h2 className="modal-heading">{modalTitle}</h2> : null}
        <div className="flex-1 overflow-y-auto scrollbar-hide mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
