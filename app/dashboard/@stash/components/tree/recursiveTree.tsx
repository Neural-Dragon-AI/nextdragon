import { FileSystemObject } from '@/store/NextStore';
import { FileTree } from "./fileTree"
import { FolderTree } from "./folderTree"

interface RecursiveTreeProps {
	mapping: FileSystemObject[];
}

export const RecursiveTree: React.FC<RecursiveTreeProps> = ({ mapping }) => {
	return (
		<>
			<section className="flex flex-col h-full justify-start space-y-5">
				{mapping.map((item, index) => {
					if (item.type === 'file') {
						return <FileTree key={item.name.replace(/\s/g, "").toLowerCase()} data={item} />;
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
			</section>
		</>
	);
};
