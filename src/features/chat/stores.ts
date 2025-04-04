import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { ChatMessageType } from "./types";

export interface ChatStore {
	messages: ChatMessageType[];
	addMessage: (message: ChatMessageType) => void;
	addChunkToMessage: (chunk: string) => void;
	reset: () => void;
}

export const useChatStore = create(
	immer<ChatStore>((set) => ({
		messages: [],
		addMessage: (message: ChatMessageType) =>
			set((state) => {
				state.messages.push(message);
			}),
		addChunkToMessage: (chunk: string) =>
			set((state) => {
				const lastMessage = state.messages[state.messages.length - 1];
				// const message = state.messages.find((m) => m.id === messageId);

				if (!lastMessage) {
					return;
				}

				lastMessage.content += chunk;
			}),
		reset: () => {
			set((state) => {
				state.messages = [];
			});
		},
	}))
);
