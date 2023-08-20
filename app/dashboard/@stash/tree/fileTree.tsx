'use client'
import { FileTreeType } from './Tree'




interface FileTreeProps {
	data: FileTreeType;
}

export const FileTree: React.FC<FileTreeProps> = ({ data }) => {

	return <div className="bg-cyan-900/[.7] font-proxima text-white w-fit h-fit p-1 m-1 rounded-md cursor-pointer">{data.name}</div>
}
