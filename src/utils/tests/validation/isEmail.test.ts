import { expect } from 'chai';
import { isEmail } from '../../validation/isEmail';

describe('isEmail', () => {
    it('checking correct email', () => {
        const email = 'test1@test.ru';

        expect(isEmail(email)).to.be.true;
    });

    it('checking email without @', () => {
        const email = 'test.test.ru';

        expect(isEmail(email)).to.be.false;
    });

    it('checking email with whitespace', () => {
        const email = 'tes t@test.ru';

        expect(isEmail(email)).to.be.false;
    });
});