import { expect } from 'chai';
import { queryStringify } from '../queryStringify';

describe('queryStringify', () => {
    it('checking simple object', () => {
        const data = {
            a: '123',
            b: '456',
            c: '789',
        };

        expect(queryStringify(data)).to.equal('?a=123&b=456&c=789');
    });

    it('checking nested object', () => {
        const data = {
            a: '111',
            b: {
                c: '222',
                d: '333',
            },
        };

        expect(queryStringify(data)).to.equal('?a=111&b[c]=222&b[d]=333');
    });

    it('checking nested array', () => {
        const data = {
            a: '11',
            b: ['22', '33', '44'],
        };

        expect(queryStringify(data)).to.equal('?a=11&b[0]=22&b[1]=33&b[2]=44');
    });

    it('checking nested array and object', () => {
        const data = {
            a: '123',
            b: [{ c: '234', d: '345' }, { e: '456' }],
        };

        expect(queryStringify(data)).to.equal('?a=123&b[0][c]=234&b[0][d]=345&b[1][e]=456');
    });

    it('checking without arg', () => {
        expect(queryStringify()).to.equal('');
    });
});
