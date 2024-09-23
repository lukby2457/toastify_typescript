import "./Toast.css";
import { useEffect, useState, FC } from "react";
import EventBus from "./eventBus";
import { createPortal } from "react-dom";

interface ToastMessage {
  id: number;
  message: string;
}

const Toast: FC = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const closeToast = (toastId: number): void => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== toastId));
  };

  useEffect(() => {
    const handleToastEvent = (toast: Omit<ToastMessage, "id">): void => {
      setToasts((prevToasts) => [...prevToasts, { id: Date.now(), ...toast }]);

      setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 5000);
    };

    // subscribe 함수는 이제 unsubscribe 함수를 반환하므로, 이를 저장하여 클린업에서 사용
    const unsubscribe = EventBus.subscribe("SHOW_TOAST", handleToastEvent);

    // 컴포넌트가 언마운트될 때 구독 해제
    return () => {
      if (unsubscribe) {
        unsubscribe(); // 구독 해제 호출
      }
    };
  }, []);

  return createPortal(
    <div className="toast-container">
      {toasts.map((toast, index) => (
        <div key={index} className="toast">
          <button onClick={() => closeToast(toast.id)} className="toast-close">x</button>
          <div>
            {toast.message}
          </div>
        </div>
      ))}
    </div>,
    document.getElementById("toast-Container") as HTMLElement
  );
};

export default Toast;