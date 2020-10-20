export const template = `
    <li class="message {{ className }}">
        {{ content }}
        <span class="message__time">
            {{ timeIcon }}
            <time>{{ time }}</time>
        </span>
    </li>
`;