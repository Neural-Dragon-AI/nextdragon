import { create } from 'zustand'
import { persist } from 'zustand/middleware'


export interface FileTreeType {
	type: "file";
	name: string;
	id: string;
}

export interface FolderTreeType {
	type: "folder";
	name: string;
	childrens: Array<FileTreeType | FolderTreeType>;
}

export type FileSystemObject = FileTreeType | FolderTreeType;



export interface Profile {
	id: number;
	username: string;
	openaiApiKey: string;
	avatarUrl: string;
	stash_mapping: FileSystemObject[]
}

export interface Message {
	role: string
	content: string
	timestamp: number
	tokens_count: number
}

export interface Conversation {
	conversation: Message[]
}

export interface Folders {
	[folderName: string]: boolean;
}

export const extractFolderNames = (items: FileSystemObject[]): Folders => {
	let result: Folders = {};
	for (const item of items) {
		if (item.type === 'folder') {
			result[item.name] = false; // default value, supponendo che le cartelle siano chiuse di default
			// Ricorsivamente controlla anche i children di questa cartella
			const childFolders = extractFolderNames(item.childrens);
			result = { ...result, ...childFolders };
		}
	}
	return result;
};




interface NextStore {

	config_history: string[];
	active_chat: string;
	current_profile: Profile;
	folders: Folders;


	toggleFolderStatus: (folderKey: string) => void;
	addToHistory: (item: string) => void;
	setActiveChat: (activeChatIndex: string) => void;
	setCurrentProfile: (current_profile: Profile) => void;
}

export const useNextStore = create(
	persist<NextStore>(
		(set, get) => ({
			config_history: [],
			active_chat: '',
			current_profile: { id: 0, username: 'test', openaiApiKey: '', avatarUrl: '', stash_mapping: [] },
			folders: {},

			addToHistory: (item) => set((state) => ({ config_history: [item, ...state.config_history] })),

			setActiveChat: (chat_id) => set({ active_chat: chat_id }),

			setCurrentProfile: (new_profile) => {
				set((state) => {
					const newFolders = extractFolderNames(new_profile.stash_mapping);
					return {
						...state,
						current_profile: new_profile,
						folders: newFolders
					};
				});
			},

			toggleFolderStatus: (folderKey: string) => {
				set((state) => {
					const currentStatus = state.folders[folderKey];

					// Se la chiave non esiste nel tuo stato, potresti voler gestire questo caso separatamente.
					if (currentStatus === undefined) {
						console.error(`Folder with key ${folderKey} does not exist.`);
						return state;
					}

					return {
						...state,
						folders: {
							...state.folders,
							[folderKey]: !currentStatus
						}
					};
				});
			},



		}),
		{
			name: "config"
		}
	))
	;
