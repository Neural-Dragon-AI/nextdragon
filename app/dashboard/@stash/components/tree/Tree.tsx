'use client'
import { RecursiveTree } from "./recursiveTree"
import { useNextStore, FileSystemObject } from '@/store/NextStore'



interface TreeProps {
	stash_mapping: FileSystemObject[]  
}


export const Tree: React.FC<TreeProps> = ({ stash_mapping }) => {

	return (
		<div className="h-full w-full  flex flex-col space-y-2 m-0  rounded-md">

			<RecursiveTree mapping={stash_mapping} />

		</div>
	);
};
