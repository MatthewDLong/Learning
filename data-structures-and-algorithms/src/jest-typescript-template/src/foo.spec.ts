import * as foo from './foo';

describe('Name of the group', () => {
    it('should foo', () => {
        expect(foo.foo()).toEqual('foo');
    });

    it('should bar', () => {
        expect(foo.bar()).toEqual('bar');
    });
});