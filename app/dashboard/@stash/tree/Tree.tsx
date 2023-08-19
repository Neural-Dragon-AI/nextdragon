'use client'
import { FileTree } from "./fileTree"
import { FolderTree } from "./folderTree"



interface FileTreeType {
	type: "file";
	name: string;
}

interface FolderTreeType {
	type: "folder";
	name: string;
	childrens: Array<FileTreeType | FolderTreeType>;
}

type FileSystemObject = FileTreeType | FolderTreeType;

interface TreeProps {
	data: FileSystemObject[];
}


export const Tree: React.FC<TreeProps> = ({ data }) => {
	return (
		<div className="h-auto flex flex-col space-y-2 m-2">
			{data.map((item, index) => {
				if (item.type === 'file') {
					return <FileTree key={index} data={item} />;
				}

				if (item.type === 'folder') {
					return (
						<div className="" key={index}>
							<FolderTree key={index} data={item}>
								<Tree key={index} data={item.childrens} />
							</FolderTree>
						</div>
					);
				}

				return null; // Aggiunto per evitare un warning di "expected return"
			})}
		</div>
	);
};
