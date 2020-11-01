import { expect } from 'chai';
import { fake } from 'sinon';
import { HTTPTransport } from './index';
import { HTTPMethods } from "./types";

describe('HTTPTransport', () => {
    const openMock = fake();
    const sendMock = fake();
    const setRequestHeaderMock = fake();

    before(() => {
       global.XMLHttpRequest = class XMLHttpRequestMock {
           open(...args: any[]) {
               return openMock(...args);
           };
           send(...args: any[]) {
               return sendMock(...args);
           }
           setRequestHeader(...args: any[]) {
               return setRequestHeaderMock(...args);
           };
       } as unknown as typeof XMLHttpRequest;
    });

    afterEach(() => {
        openMock.resetHistory();
        sendMock.resetHistory();
        setRequestHeaderMock.resetHistory();
    });

    it('checking setDomain', () => {
        const httpTransport = new HTTPTransport();

        httpTransport.setDomain('new-domain');

        // @ts-ignore
        expect(httpTransport._domain).to.equal('new-domain');
    });

    it('checking setRequestHeaders', () => {
        const httpTransport = new HTTPTransport();

        httpTransport.request('test', { method: HTTPMethods.GET, headers: { prop1: 'value1', prop2: 'value2' } });

        expect(setRequestHeaderMock.getCall(0).args).to.deep.equal(['prop1', 'value1']);
        expect(setRequestHeaderMock.getCall(1).args).to.deep.equal(['prop2', 'value2']);
    });

    it('checking method get', () => {
        const httpTransport = new HTTPTransport();

        httpTransport.get('get-test', { body: { 'get-prop': 'get-value' } });

        expect(openMock.firstCall.args).to.deep.equal([HTTPMethods.GET, 'get-test?get-prop=get-value']);
        expect(sendMock.firstCall.firstArg).to.equal(undefined);
    });

    it('checking method put', () => {
        const httpTransport = new HTTPTransport();

        httpTransport.put('put-test', { body: { 'put-prop': 'put-value' } });

        expect(openMock.firstCall.args).to.deep.equal([HTTPMethods.PUT, 'put-test']);
        expect(sendMock.firstCall.lastArg).to.equal('{"put-prop":"put-value"}');
    });

    it('checking method post', () => {
        const httpTransport = new HTTPTransport();

        httpTransport.post('post-test', { body: { 'post-prop': 'post-value' } });

        expect(openMock.firstCall.args).to.deep.equal([HTTPMethods.POST, 'post-test']);
        expect(sendMock.firstCall.lastArg).to.equal('{"post-prop":"post-value"}');
    });

    it('checking method delete', () => {
        const httpTransport = new HTTPTransport();

        httpTransport.delete('delete-test', { body: { 'delete-prop': 'delete-value' } });

        expect(openMock.firstCall.args).to.deep.equal([HTTPMethods.DELETE, 'delete-test']);
        expect(sendMock.firstCall.lastArg).to.equal('{"delete-prop":"delete-value"}');
    });
});
