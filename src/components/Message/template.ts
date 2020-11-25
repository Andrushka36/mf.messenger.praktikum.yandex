export const template = `
    <li class="message {{ className }}">
        $if[[
            (( {{ user }} )),
            (( <a href="{{ linkHref }}" class="message__user">{{ user }}</a> ))
        ]]
        {{ content }}
        <span class="message__time">
            {{ timeIcon }}
            <time>{{ time }}</time>
        </span>
    </li>
`;
