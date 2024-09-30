import React from "react";
import "./Confirm.dialog.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ConfirmDialog = ({
  open,
  onClose,
  onConfirmText,
  onCloseText,
  title,
  message,
  state,
  icon,
  callbackOnSuccess,
  callbackOnFailed,
  note = "",
  otherActions = [],
}) => {
  if (!open) return <></>;

  const onSuccess = () => {
    callbackOnSuccess();
    onClose();
  };
  const onFailed = () => {
    callbackOnFailed();
    onClose();
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-white rounded-3xl px-5 py-7 text-center max-w-[800px]">
        <FontAwesomeIcon className="text-yellow-600 pb-2" size="4x" icon={`fa-solid ${icon}`} />
        <div className="text-blue-800 font-bold pb-2">{title}</div>
        <div className="font-bold pb-2">{message}</div>
        <div className="text-yellow-600 ">{note}</div>
        <button className="form-button hover:underline" onClick={() => onSuccess()}>
          {onConfirmText ? onConfirmText : "Confirm"}
        </button>
        <button className="form-button hover:underline text-red-800" onClick={() => onFailed()}>
          {onCloseText ? onCloseText : "Cancel"}
        </button>
        {otherActions.map((action, index) => {
          const { actionText, onActionClick } = action;
          return (
            <button className="form-button hover:underline" key={`action_${index}`} onClick={onActionClick}>
              {actionText}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ConfirmDialog;
//  <div className="confirm-dialog-container">
//       <div className="confirm-dialog">
//         <FontAwesomeIcon className="text-yellow-600 pb-2" size="4x" icon="fa-solid fa-triangle-exclamation" />

//         <div className="confirm-dialog-title">{title}</div>
//         <div className="confirm-dialog-content">{message}</div>
//         <div className="confirm-dialog-note">{note}</div>
//         <div className="confirm-dialog-actions">
//           <button className="form-input" onClick={onFailed}>
//             No
//           </button>
//           <button className="form-input" onClick={onSuccess}>
//             Yes
//           </button>
//         </div>
//       </div>
//     </div>
