import { expect } from 'chai';
import { getAvatarPath } from '../getAvatarPath';

describe('getAvatarPath', () => {
    describe('with protocol and host', () => {
        before(() => {
            process.env.HOST = 'test.ru';
        });

        it('with path', () => {
            expect(getAvatarPath('/image.jpg')).to.equal('https://test.ru/image.jpg');
        });

        it('without path', () => {
            expect(getAvatarPath(null)).to.equal('/assets/avatar.jpg');
        });
    });

    describe('without protocol and host', () => {
        before(() => {
            delete process.env.HOST;
        });

        it('with path', () => {
            expect(getAvatarPath('/image.jpg')).to.equal('/image.jpg');
        });

        it('without path', () => {
            expect(getAvatarPath(null)).to.equal('/assets/avatar.jpg');
        });
    });
});
