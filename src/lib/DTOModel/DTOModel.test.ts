import { expect } from 'chai';
import { stub } from 'sinon';
import { DTOModel } from './index';
import { httpTransport } from '../HTTPTransport';

describe('DTOModel', () => {
    it('checking find', () => {
        const getStub = stub(httpTransport, 'get');

        const dtoModel = new DTOModel('find-method');

        dtoModel.find({ findProp: 'findValue' });

        expect(getStub.firstCall.args).to.deep.equal(['find-method', { body: { findProp: 'findValue' } }]);

        getStub.restore();
    });

    it('checking update', () => {
        const updateStub = stub(httpTransport, 'put');

        const dtoModel = new DTOModel('update-method');

        dtoModel.update({ updateProp: 'updateValue' });

        expect(updateStub.firstCall.args).to.deep.equal(['update-method', { body: { updateProp: 'updateValue' } }]);

        updateStub.restore();
    });

    it('checking delete', () => {
        const deleteStub = stub(httpTransport, 'delete');

        const dtoModel = new DTOModel('delete-method');

        dtoModel.delete({ deleteProp: 'deleteValue' });

        expect(deleteStub.firstCall.args).to.deep.equal(['delete-method', { body: { deleteProp: 'deleteValue' } }]);

        deleteStub.restore();
    });

    it('checking create', () => {
        const createStub = stub(httpTransport, 'post');

        const dtoModel = new DTOModel('create-method');

        dtoModel.create({ createProp: 'createValue' });

        expect(createStub.firstCall.args).to.deep.equal(['create-method', { body: { createProp: 'createValue' } }]);

        createStub.restore();
    });

    it('checking get', () => {
        const dtoParent = new DTOModel('get-method');
        const dtoChild = dtoParent.get(36);

        // @ts-ignore
        expect(dtoChild._name).to.equal('get-method/36');
    });
});
