import { Component } from '../../lib/Component';
import { templator } from '../../lib/Templator';
import { template } from './template';
import { MessageDate } from '../MessageDate';
import { Message } from '../Message';
import { MessageContent } from '../MessageContent';
import { MessageAttach } from '../MessageAttach';

export class Messages extends Component<{}> {
    messages: Component[] = [];

    prerender() {
        this.messages = [
            new MessageDate({ date: '19 июня' }),
            new Message({
                content: [
                    new MessageContent({
                        text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
                    }),
                    new MessageContent({
                        last: true,
                        text: 'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
                    }),
                ],
                time: '11:56',
                type: 'incoming',
            }),
            new Message({
                attach: true,
                content: [
                    new MessageAttach({
                        alt: 'photo.jpg',
                        src: '/assets/photo.jpg',
                        srcset: '/assets/photo.webp',
                    })
                ],
                time: '11:56',
                type: 'incoming',
            }),
            new Message({
                content: [
                    new MessageContent({
                        last: true,
                        text: 'Круто!',
                    }),
                ],
                status: 'read',
                time: '12:00',
                type: 'outgoing',
            }),
        ];
    }

    render() {
        return templator.compile(template, { messages: this.messages });
    }
}