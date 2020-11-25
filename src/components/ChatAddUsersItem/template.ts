export const template = `
    <label class="chat-add-users-item">
        <input type="checkbox" name="id" value="{{ id }}" />
        <span>{{ login }}</span>
        <span>
            <span>{{ first_name }} {{ second_name }}</span>
            $if[[ (( {{ display_name }} )), (( <span> / {{ display_name }} </span> )) ]]
        </span>
    </label>
`;
