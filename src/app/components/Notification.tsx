import React, { useEffect } from "react";

interface NotificationProps {
  message?: string;
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div className="toast toast-bottom toast-left">
      <div className="alert p-2 text-sm shadow-lg">
        <span className="flex items-center">{message}</span>
      </div>
    </div>
  );
};

export default Notification;
