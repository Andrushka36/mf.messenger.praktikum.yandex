import { Store } from './lib/Store';
import { UserResponseType } from './models/profile';
import { ChatType } from './models/chats';

export const userStore = new Store<UserResponseType>({} as UserResponseType);
export const chatsStore = new Store<ChatType[]>([]);
