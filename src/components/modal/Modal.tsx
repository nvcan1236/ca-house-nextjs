import useClickOutSide from "../../hooks/useClickOutSide";
import { ReactNode, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { closeAuthModal } from "@/stores/slices/authSlice";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import useScrollLock from "@/hooks/useScrollLock";

interface ModalProps {
  children: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: ModalProps) => {
  const show = useAppSelector((state) => state.auth.showAuthModal);
  const dispatch = useAppDispatch();
  const handleCloseModel = () => {
    dispatch(closeAuthModal());
    onClose && onClose();
  };
  const modalRef = useClickOutSide<HTMLDivElement>(handleCloseModel);
  const nodeRef = useRef(null);
  useScrollLock(!show);

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={show}
      timeout={300}
      classNames={"modal"}
      // unmountOnExit
    >
      {(state) =>
        state && (
          <div
            className={`bg-black bg-opacity-30 fixed inset-0 z-50  items-center justify-center transition-all duration-300 hidden`}
            ref={nodeRef}
          >
            <div
              className="w-[500px] content transition-all duration-300"
              ref={modalRef}
            >
              {children}
            </div>
          </div>
        )
      }
    </CSSTransition>,
    document.body
  );
};

export default Modal;
