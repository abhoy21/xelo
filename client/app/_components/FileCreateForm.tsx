import { Plus } from "lucide-react";

type FileCreateFormProps = {
  newItemName: string;
  setNewItemName: React.Dispatch<React.SetStateAction<string>>;
  creatingType: "file" | "folder" | null;
  handleCreate: () => void;
};

const FileCreateForm: React.FC<FileCreateFormProps> = ({
  newItemName,
  setNewItemName,
  creatingType,
  handleCreate,
}) => {
  if (!creatingType) return null;

  return (
    <div className='flex items-center mt-2'>
      <input
        type='text'
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        placeholder={`Enter ${creatingType} name`}
        className='bg-[#2e2e2e] text-white px-1 py-0.5 text-sm w-full'
      />
      <button
        onClick={handleCreate}
        className='ml-1 p-1 hover:bg-gray-600 rounded'
      >
        <Plus size={14} />
      </button>
    </div>
  );
};

export default FileCreateForm;
