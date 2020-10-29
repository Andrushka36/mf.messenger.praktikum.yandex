import { ChatActionsButton } from '../ChatActionsButton';
import { ChatActionsModal } from '../ChatActionsModal';

export interface IChatInformation {
    /**
     * Альтернативный текст для аватарки
     */
    avatarAlt: string;

    /**
     * Путь к аватарке
     */
    avatarSrc: string;

    /**
     * Кнопка, отвечающая за отображение модального окна с действиями с чатом
     */
    chatActionsButton: ChatActionsButton;

    /**
     * Модальное окно с действиями с чатом
     */
    chatActionsModal: ChatActionsModal;

    /**
     * Название чата
     */
    chatName: string;

    /**
     * Статус чата
     */
    status: string;
}