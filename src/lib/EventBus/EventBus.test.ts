import { expect } from 'chai';
import { fake } from 'sinon';
import { EventBus } from './index';

describe('EventBus', () => {
    it('checking adding event listeners', () => {
        const fn1 = fake();
        const fn2 = fake();

        const eventBus = new EventBus();

        eventBus.on('bang', fn1);
        eventBus.on('bang', fn2);

        expect(eventBus.getListeners()).to.deep.equal({ bang: [fn1, fn2] });
    });

    it('checking removing event listener', () => {
        const fn1 = fake();
        const fn2 = fake();

        const eventBus = new EventBus();

        eventBus.on('bang', fn1);
        eventBus.on('bang', fn2);
        eventBus.off('bang', fn1)

        expect(eventBus.getListeners()).to.deep.equal({ bang: [fn2] });
    });

    it('checking emitting event', () => {
        const fn = fake();

        const eventBus = new EventBus();

        eventBus.on('bang', fn);
        eventBus.emit('bang', 36);

        expect(fn.firstCall.lastArg).to.equal(36);
    });
});