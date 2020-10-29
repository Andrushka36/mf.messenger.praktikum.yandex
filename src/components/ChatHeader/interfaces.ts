import { ChatRenameForm } from '../ChatRenameForm';
import { ChatInformation } from '../ChatInformation';

export interface IChatHeader {
    /**
     * Форма изменения названия чата
     */
    chatRenameForm: ChatRenameForm;

    /**
     * Компонент с информацией о чате
     */
    chatInformation: ChatInformation;
}