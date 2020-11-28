import { Store } from './lib/Store';
import { UserType } from './models/profile';
import { ChatType } from './models/chats';

export const userStore = new Store<UserType>({} as UserType);
export const chatsStore = new Store<ChatType[]>([]);
