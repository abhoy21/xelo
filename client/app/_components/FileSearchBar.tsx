import { Search } from "lucide-react";

type FileSearchBarProps = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const FileSearchBar: React.FC<FileSearchBarProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className='mb-2 relative'>
      <input
        type='text'
        value={searchTerm}
        onChange={handleSearch}
        placeholder='Search...'
        className='w-full bg-[#2a2a2a] text-white px-2 py-1 text-sm rounded'
      />
      <Search
        size={14}
        className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400'
      />
    </div>
  );
};

export default FileSearchBar;
