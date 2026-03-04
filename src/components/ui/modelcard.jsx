import React from "react";
import Button from "./Button";

export default function ModalCard({
  title,
  onCancel,
  onSave,
  children,
  cancelLabel = "Cancel",
  saveLabel = "Save",
}) {
  return (
    /* Backdrop */
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 p-8">

        {/* Title */}
        <h2 className="text-2xl font-medium text-gray-900 mb-6">{title}</h2>

        {/* Dynamic body */}
        <div className="mb-8">{children}</div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onSave}>
            {saveLabel}
          </Button>
        </div>

      </div>
    </div>
  );
}