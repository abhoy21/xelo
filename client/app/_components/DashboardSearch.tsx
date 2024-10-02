import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

type DashboardSearchProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export function DashboardSearchBar({
  searchQuery,
  setSearchQuery,
}: DashboardSearchProps) {
  return (
    <div className='relative mb-8'>
      <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
      <Input
        type='text'
        placeholder='Search repositories...'
        className='pl-10 bg-[#1e1e1e] border-[#3e3e3e] text-[#d4d4d4] placeholder-gray-400 w-full'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
