export const template = `
    <label class="chat-add-users-item">
        <input type="checkbox" name="id" value="{{ id }}" />
        <span>{{ login }}</span>
        <span>
            <span>{{ firstName }} {{ secondName }}</span>
            $if[[ (( {{ displayName }} )), (( <span> / {{ displayName }} </span> )) ]]
        </span>
    </label>
`;
