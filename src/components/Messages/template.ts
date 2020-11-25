export const template = `
    <div class="chat__content">
        <h2 class="visually-hidden">Список сообщений</h2>
            $if[[
                (( {{ loading }} )),
                (( {{ loader }} )),
                ((
                    <ul class="chat__messages">
                        <li class="js-load-messages" />
                        {{ messages }}
                    </ul>
                ))
            ]]
    </div>
`;
