import useIsFile from "@/hooks/useIsFile";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type TabBarComponentProps = {
  onSelect: (path: string) => void;
  selectedFile: string;
};

interface Tab {
  id: number;
  name: string;
  path: string;
}

const TabBarComponent: React.FC<TabBarComponentProps> = ({
  onSelect,
  selectedFile,
}) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const { isFile } = useIsFile(selectedFile);

  useEffect(() => {
    if (isFile && selectedFile) {
      const fileName = selectedFile.split("/").pop() || "";
      const existingTab = tabs.find((tab) => tab.path === selectedFile);
      if (!existingTab) {
        const newTab: Tab = {
          id: Date.now(),
          name: fileName,
          path: selectedFile,
        };
        setTabs((prevTabs) => [...prevTabs, newTab]);
        setActiveTabId(newTab.id);
      } else {
        setActiveTabId(existingTab.id);
      }
    }
  }, [selectedFile, tabs, isFile]);

  const closeTab = (tabId: number) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (activeTabId === tabId) {
      const remainingTabs = tabs.filter((tab) => tab.id !== tabId);
      if (remainingTabs.length > 0) {
        setActiveTabId(remainingTabs[0].id);
        onSelect(remainingTabs[0].path);
      } else {
        setActiveTabId(null);
      }
    }
  };

  const handleTabClick = (tabId: number) => {
    setActiveTabId(tabId);
    const selectedTab = tabs.find((tab) => tab.id === tabId);
    if (selectedTab) {
      onSelect(selectedTab.path);
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
          onClick={() => handleTabClick(tab.id)}
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
