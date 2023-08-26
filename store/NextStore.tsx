import { create } from 'zustand'
import { createClient } from "@supabase/supabase-js"

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
	conversation: Message[] | []
}

export interface Folders {
	[folderName: string]: boolean;
}

export const extractFolderNames = (items: FileSystemObject[]): Folders => {
	let result: Folders = {};
	for (const item of items) {
		if (item.type === 'folder') {
			result[item.name] = false;
			const childFolders = extractFolderNames(item.childrens);
			result = { ...result, ...childFolders };
		}
	}
	return result;
};

interface NextStore {

	config_history: string[];
	active_chat: string;
	current_conversation: Message[];
	current_profile: Profile;
	folders: Folders;
	active_index: number;
	work_conversation: Message[];


	toggleFolderStatus: (folderKey: string) => void;
	addToWorkingChat: (item: Message[]) => void;
	setActiveChat: (activeChatIndex: string) => void;
	setCurrentProfile: (current_profile: Profile) => void;
	fetchConversation: (converation_id: string) => void;
	setActiveIndex: (active_index: number) => void;

}

export const useNextStore = create<NextStore>(
	(set, get) => ({
		config_history: [],
		active_chat: '',
		current_profile: { id: 0, username: 'test', openaiApiKey: '', avatarUrl: '', stash_mapping: [] },
		folders: {},
		current_conversation: [],
		work_conversation: [],
		active_index: 0,

		addToWorkingChat: (item) => set((state) => ({ work_conversation: [...state.work_conversation, ...item] })),

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

		fetchConversation: async (conversation_id) => {
			const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_KEY!, {
				db: { schema: "conversations" }
			})
			const response = await supabase.from(conversation_id.replace(/\s/g, "").toLowerCase()).select('*').order('timestamp', { ascending: true })
			if (response.data) {
				set({ current_conversation: response.data })
			}
			else {
				set({ current_conversation: [] })

			}

		},

		setActiveIndex: async (active_index) => {
			set({ active_index: active_index })
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
	})
)
