import { create } from 'zustand'

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

interface NextStore {

	config_history: string[];
	active_chat: string;
	current_profile: Profile;



	addToHistory: (item: string) => void;
	setActiveChat: (activeChatIndex: string) => void;
	setCurrentProfile: (current_profile: Profile) => void;
}

export const useNextStore = create<NextStore>
	((set, get) => ({
		config_history: [],
		active_chat: 'Conversazione 1',
		current_profile: { id: 0, username: 'test', openaiApiKey: '', avatarUrl: '', stash_mapping: [] },

		addToHistory: (item) => set((state) => ({
			config_history: [item, ...state.config_history]
		})),

		setActiveChat: (chat_id) => set({
			active_chat: chat_id
		}),

		setCurrentProfile: (new_profile) => set({
			current_profile: new_profile
		}),



	}));
