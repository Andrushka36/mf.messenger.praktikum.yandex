import { ChatHeader } from '../ChatHeader';
import { ChatDeleteModal } from '../ChatDeleteModal';
import { Messages } from '../Messages';
import { MessageForm } from '../MessageForm';

export interface IChat {
    /**
     * Хедер чата
     */
    chatHeader: ChatHeader;

    /**
     * Модальное окно подтверждения удаления чата
     */
    deleteModal: ChatDeleteModal;

    /**
     * Блок сообщений
     */
    messages: Messages;

    /**
     * Форма отправки сообщения
     */
    messageForm: MessageForm;
}