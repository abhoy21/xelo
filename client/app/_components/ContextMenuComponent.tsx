import { Trash2, X } from "lucide-react";
import React from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  onDelete: () => void;
  onClose: () => void;
}

const ContextMenuComponent: React.FC<ContextMenuProps> = ({
  x,
  y,
  onDelete,
  onClose,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: y,
        left: x,
        backgroundColor: "#1e1e1e",
        border: "1px solid #333",
        borderRadius: "4px",
        padding: "8px",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onDelete}
        className='flex items-center w-full text-left px-2 py-1 hover:bg-[#2e2e2e] rounded'
      >
        <Trash2 size={16} className='mr-2 text-red-500' />
        Delete
      </button>
      <button
        onClick={onClose}
        className='flex items-center w-full text-left px-2 py-1 hover:bg-gray-700 rounded mt-1'
      >
        <X size={16} className='mr-2 text-yellow-500' />
        Close
      </button>
    </div>
  );
};

export default ContextMenuComponent;
