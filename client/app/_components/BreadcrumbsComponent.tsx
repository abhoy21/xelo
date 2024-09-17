import { ChevronRight } from "lucide-react";
import React from "react";

type FileStructure = {
  [key: string]: FileStructure;
};

type BreadcrumbsComponentProps = {
  tree: FileStructure;
  selectedFile: string;
};

const BreadcrumbsComponent: React.FC<BreadcrumbsComponentProps> = ({
  selectedFile,
}) => {
  const getBreadcrumbs = (path: string) => {
    if (!path) return [];

    const parts = path.split("/");
    return parts.map((part, index) => {
      return {
        name: part,
        path: parts.slice(0, index + 1).join("/"),
      };
    });
  };

  const breadcrumbs = getBreadcrumbs(selectedFile);

  return (
    <div className='flex items-center text-sm text-gray-400'>
      {breadcrumbs.map((breadcrumb, index) => (
        <React.Fragment key={index}>
          {index > 1 && (
            <ChevronRight size={14} className='mx-1 text-blue-500' />
          )}
          <span className='text-gray-400 text-sm hover:text-gray-300 cursor-pointer'>
            {breadcrumb.name}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadcrumbsComponent;
