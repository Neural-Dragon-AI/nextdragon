import { RecursiveTree } from "./recursiveTree"
import { FileSystemObject } from '@/store/NextStore'



interface TreeProps {
	stash_mapping: FileSystemObject[]  
}


export const Tree: React.FC<TreeProps> = ({ stash_mapping }) => {

	return (
		<div className="h-full w-full m-0  rounded-md p-4">
			<RecursiveTree mapping={stash_mapping} />
		</div>
	);
};
