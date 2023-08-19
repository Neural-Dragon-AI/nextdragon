'use client'


interface FileTreeType {
	type: "file";
	name: string;
}

interface FileTreeProps {
	data: FileTreeType;
}



export const FileTree: React.FC<FileTreeProps> = ({ data }) => {




	return <div className="bg-cyan-200">{data.name}</div>
}
