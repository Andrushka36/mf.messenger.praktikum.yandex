import { expect } from 'chai';
import { getApiPath } from '../getApiPath';

describe('getApiPath', () => {
    it('with host, protocol and path', () => {
        expect(getApiPath({ host: 'test.ru', path: '/my-path' })).to.equal('https://test.ru/my-path');
    });

    it('with only host and protocol', () => {
        expect(getApiPath({ host: 'test.ru' })).to.equal('https://test.ru');
    });

    it('with only path', () => {
        expect(getApiPath({ path: '/my-path' })).to.equal('/my-path');
    });

    it('without origin and path', () => {
        expect(getApiPath({})).to.equal('');
    });
});
