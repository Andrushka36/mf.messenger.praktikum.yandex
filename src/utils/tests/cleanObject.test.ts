import { expect } from 'chai';
import { cleanObject } from '../cleanObject';

describe('cleanObject',() => {
    it('checking remove undefined element', () => {
        const obj = {
            prop1: 'not undefined',
            prop2: undefined,
        }

        const expected = {
            prop1: 'not undefined',
        }

        expect(cleanObject(obj)).to.deep.equal(expected)
    });


    it('checking remove null element', () => {
        const obj = {
            prop1: 'not null',
            prop2: null,
        }

        const expected = {
            prop1: 'not null',
        }

        expect(cleanObject(obj)).to.deep.equal(expected)
    });
});