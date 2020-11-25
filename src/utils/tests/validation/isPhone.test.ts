import { expect } from 'chai';
import { isPhone } from '../../validation/isPhone';

describe('isPhone', () => {
    it('checking invalid phone with max count digits', () => {
        const phone = '123456';

        expect(isPhone(phone)).to.be.false;
    });

    it('checking valid phone with min count digits', () => {
        const phone = '1234567';

        expect(isPhone(phone)).to.be.true;
    });

    describe('checking phone starting with 8', () => {
        it('checking email with dash', () => {
            const phone = '8-123-456-78-90';

            expect(isPhone(phone)).to.be.true;
        });

        it('checking email with whitespace', () => {
            const phone = '8 123 456 78 90';

            expect(isPhone(phone)).to.be.true;
        });

        it('checking email with only digits', () => {
            const phone = '81234567890';

            expect(isPhone(phone)).to.be.true;
        });
    });

    describe('checking phone starting with +7', () => {
        it('checking email with dash', () => {
            const phone = '+7-123-456-78-90';

            expect(isPhone(phone)).to.be.true;
        });

        it('checking email with whitespace', () => {
            const phone = '+7 123 456 78 90';

            expect(isPhone(phone)).to.be.true;
        });

        it('checking email with only digits', () => {
            const phone = '+71234567890';

            expect(isPhone(phone)).to.be.true;
        });
    });

    it('checking phone with parenthesis', () => {
        const phone = '8 (123) 456 78 90';

        expect(isPhone(phone)).to.be.false;
    });

    it('checking phone with letter', () => {
        const phone = '+7 s123 456 78 90';

        expect(isPhone(phone)).to.be.false;
    });
});
