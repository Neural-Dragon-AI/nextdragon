'use client'
import { RecursiveTree } from "./recursiveTree"
import { useNextStore, FileSystemObject } from '@/store/NextStore'


export const Tree: React.FC = () => {

	const stash_mapping: FileSystemObject[] = useNextStore(state => state.current_profile.stash_mapping)

	return (
		<div className="h-full  flex flex-col space-y-2 m-0  rounded-md">

			<RecursiveTree mapping={stash_mapping} />

		</div>
	);
};
