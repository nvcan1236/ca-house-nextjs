import { ReactNode, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"

import useScrollLock from "@/hooks/use-scroll-lock"

import useClickOutSide from "../../hooks/use-click-outside"

interface ModalProps {
  children: ReactNode
  onClose?: () => void
  open: boolean
}

const Modal = ({ children, onClose, open = false }: ModalProps) => {
  // const [show, setShow] = useState<boolean>(open);
  const handleCloseModel = () => {
    if (onClose) onClose()
    // setShow(false);
  }
  console.log(open)
  const modalRef = useClickOutSide<HTMLDivElement>(handleCloseModel)
  const nodeRef = useRef(null)
  useScrollLock(!open)

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={open}
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
  )
}

export default Modal
