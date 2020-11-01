import { expect } from 'chai';
import { isShortPassword } from '../../validation/isShortPassword';

describe('isShortPassword', () => {
    it('checking invalid password with max count digits', () => {
        const password = '1234567';

        expect(isShortPassword(password)).to.be.true;
    });

    it('checking valid password with min count digits', () => {
        const password = '12345678';

        expect(isShortPassword(password)).to.be.false;
    });
});