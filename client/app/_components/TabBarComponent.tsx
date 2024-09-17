import useIsFile from "@/hooks/useIsFile"; // Import the useIsFile hook
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type TabBarComponentProps = {
  selectedFile: string;
};

interface Tab {
  id: number;
  name: string;
}

const TabBarComponent: React.FC<TabBarComponentProps> = ({ selectedFile }) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);

  const { isFile } = useIsFile(selectedFile); // Use the hook to check if it's a file

  useEffect(() => {
    if (isFile && selectedFile) {
      // Check if selectedFile is a file and not empty
      const fileName = selectedFile.split("/").pop() || "";
      const existingTab = tabs.find((tab) => tab.name === fileName);

      if (!existingTab) {
        // If the file is not already open, add it as a new tab
        const newTab: Tab = { id: Date.now(), name: fileName };
        setTabs((prevTabs) => [...prevTabs, newTab]);
        setActiveTabId(newTab.id); // Set the new tab as active
      } else {
        setActiveTabId(existingTab.id);
      }
    }
  }, [selectedFile, tabs, isFile]); // Add isFile to dependencies

  const closeTab = (tabId: number) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));

    if (activeTabId === tabId) {
      setActiveTabId(tabs.length > 1 ? tabs[0].id : null);
    }
  };

  return (
    <div className='flex bg-[#2d2d2d] text-sm space-x-1 w-full'>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`px-3 py-1 cursor-pointer flex items-center justify-between ${
            activeTabId === tab.id
              ? "bg-[#1e1e1e] text-white border-t-2 border-blue-500 min-w-32"
              : "text-gray-400 hover:bg-[#3c3c3c] min-w-32"
          }`}
          onClick={() => setActiveTabId(tab.id)}
        >
          {tab.name}
          {activeTabId === tab.id ? (
            <button
              className='ml-2'
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              <X size={14} className='text-red-500 hover:text-red-700' />
            </button>
          ) : (
            <></>
          )}
        </div>
      ))}
    </div>
  );
};

export default TabBarComponent;
