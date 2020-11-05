import { Err } from '../components/Error';

export const error401 = new Err({
    code: 401,
    text: 'Недостаточно прав',
});
