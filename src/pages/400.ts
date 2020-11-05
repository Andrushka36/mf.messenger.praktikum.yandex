import { Err } from '../components/Error';

export const error400 = new Err({
    code: 400,
    text: 'Запрос составлен некорректно',
});
