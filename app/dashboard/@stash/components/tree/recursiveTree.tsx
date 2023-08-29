import { FileSystemObject } from '@/store/NextStore';
import { FileTree } from "./fileTree"
import { FolderTree } from "./folderTree"

interface RecursiveTreeProps {
  mapping: FileSystemObject[];
}

export const RecursiveTree: React.FC<RecursiveTreeProps> = ({ mapping }) => {
  return (
    <>
      {mapping.map((item, index) => {
        if (item.type === 'file') {
          return <FileTree key={index} data={item} />;
        }

        if (item.type === 'folder') {
          return (
            <FolderTree key={index} data={item}>
              <RecursiveTree mapping={item.childrens || []} />
            </FolderTree>
          );
        }

        return null; 
      })}
    </>
  );
};
