import { Err } from '../components/Error';
import { render } from '../utils/render';

const error500 = new Err({
    code: 500,
});

render('#root', error500);