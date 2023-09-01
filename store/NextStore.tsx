import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { createClient } from "@supabase/supabase-js"
import { urlToHttpOptions } from 'url';

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

export const extractFilesNames = (items: FileSystemObject[]): string[] => {
	let result: string[] = [''];
	for (const item of items) {
		if (item.type === 'file') {
			result = [...result, item.name];
		}
	}
	return result;
};

interface WorkMemoryObject {
	name: string
	content: Message[]
}

interface NextStore {

	config_history: string[];
	active_chat: string;
	current_conversation: Message[];
	current_profile_id: string;
	folders: Folders;
	active_index: number;
	active_work_conversation: number;
	working_memory: WorkMemoryObject[];


	setActiveFile: (activeChatIndex: string) => void;

	setWorkingMemory: (working_memory: WorkMemoryObject[]) => void;
	pushToWorkConversation: (index: number, item: Message[]) => void;
	addWorkConversation: (name: string) => void;
	removeWorkConversation: (index: number) => void;

	fetchConversation: (converation_id: string) => void;
	setActiveIndex: (active_index: number) => void;
	setActiveWorkConversation: (index: number) => void;

}

export const useNextStore = create(
	persist<NextStore>(
		(set, get) => ({
			config_history: [],
			active_chat: '',
			current_profile_id: "",
			folders: {},
			current_conversation: [],

			active_index: 0,
			active_work_conversation: 0,
			working_memory: [],



			setActiveFile: (chat_id) => set({ active_chat: chat_id }),

			setWorkingMemory: (working_memory) => set({ working_memory: working_memory }),

			setActiveWorkConversation: (index) => set({ active_work_conversation: index }),

			addWorkConversation: (name) => {
				set((state) => {
					const newWorkConversation = { name: name, content: [] }
					let updatedWorkConversations = [...state.working_memory];
					updatedWorkConversations = [...updatedWorkConversations, newWorkConversation];
					return { working_memory: updatedWorkConversations };
				});
			},

			removeWorkConversation: (index) => {
				set((state) => {
					const updatedWorkConversations = state.working_memory.filter((_, i) => i !== index);
					return { working_memory: updatedWorkConversations };
				});
			},

			pushToWorkConversation: (index, newMessages) => {
				set((state) => {
					const updatedWorkConversations = [...state.working_memory];
					updatedWorkConversations[index].content = [...updatedWorkConversations[index].content, ...newMessages];
					console.log("PUSHSTORE", updatedWorkConversations)
					return { working_memory: updatedWorkConversations };
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




		}),
		//endOfStore


		//storeOptions
		{

			name: "nextdragon",
			skipHydration: true,
			onRehydrateStorage: (state) => {
				console.log('hydration starts')

				// optional
				return (state, error) => {
					if (error) {
						console.log('an error happened during hydration', error)
					} else {
						console.log('hydration finished')
					}
				}
			},
		}
		//endOfStoreOptions

	) //persist
) //create
