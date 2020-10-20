import { Err } from '../components/Error';
import { render } from '../utils/render';

const error404 = new Err({
    code: 404,
});

render('#root', error404);