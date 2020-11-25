import { expect } from 'chai';
import { getTime } from '../getTime';

describe('getTime', () => {
    it('checking correct time', () => {
        const date = '2020-11-19T15:33:52+00:00';

        expect(getTime(date)).to.equal('18:33');
    });

    it('checking time with minutes less than 10', () => {
        const date = '2020-11-19T15:05:52+00:00';

        expect(getTime(date)).to.equal('18:05');
    });

    it('checking incorrect time', () => {
        const date = 'zz';

        expect(getTime(date)).to.equal('');
    });
});
