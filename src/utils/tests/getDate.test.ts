import { expect } from 'chai';
import { getDate } from '../getDate';

describe('getDate', () => {
    it('checking correct date', () => {
        const date = '2020-11-19';

        expect(getDate(date)).to.equal('19 ноября');
    });

    it('checking incorrect date', () => {
        const date = 'zzz';

        expect(getDate(date)).to.equal('');
    });
});
