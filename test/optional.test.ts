import { Optional } from '../src/index';

test('Empty optional is empty', () => {
  expect(Optional.empty().isPresent()).toBe(false);
});

test('Optional of value has value', () => {
  const foo = 'foo';
  expect(Optional.of(foo).get()).toEqual(foo);
});

test('Optional of null is empty', () => {
  expect(Optional.ofNullable(null).isPresent()).toBe(false);
});

test('Optional of nullable value has value', () => {
  const foo = 'foo';
  expect(Optional.ofNullable(foo).get()).toEqual(foo);
});

test('Optional of null does not execute isPresent', () => {
  const callback = jest.fn();
  Optional.ofNullable(null).ifPresent(callback);
  expect(callback.mock.calls.length).toBe(0);
});

test('Optional of value executes isPresent', () => {
  const callback = jest.fn();
  const foo = 'foo';
  Optional.ofNullable(foo).ifPresent(callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][0]).toBe(foo);
});

test('Optional of null does not peek', () => {
  const callback = jest.fn();
  Optional.ofNullable(null).peek(callback);
  expect(callback.mock.calls.length).toBe(0);
});

test('Optional of value peeks', () => {
  const callback = jest.fn();
  const foo = 'foo';
  Optional.ofNullable(foo).peek(callback);
  expect(callback.mock.calls.length).toBe(1);
  expect(callback.mock.calls[0][0]).toBe(foo);
});

test('Optional of value is not filtered', () => {
  const foo = 'foo';
  const filteredOptional = Optional.ofNullable(foo).filter(value => value === 'foo');
  expect(filteredOptional.get()).toEqual(foo);
});

test('Optional of value is filtered', () => {
  const foo = 'foo';
  const filteredOptional = Optional.ofNullable(foo).filter(value => value === 'bar');
  expect(filteredOptional.isPresent()).toBe(false);
});

test('Optional of null is not mapped', () => {
  const callback = jest.fn();
  Optional.ofNullable(null).map(callback);
  expect(callback.mock.calls.length).toBe(0);
});

test('Optional of value is mapped', () => {
  const foo = 'foo';
  const upperFoo = Optional.of(foo)
    .map(value => value.toUpperCase())
    .get();
  expect(upperFoo).toEqual('FOO');
});

test('Optional of null is not flat mapped', () => {
  const callback = jest.fn();
  Optional.ofNullable(null).flatMap(callback);
  expect(callback.mock.calls.length).toBe(0);
});

test('Optional of value is flat mapped', () => {
  const foo = 'foo';
  const upperFoo = Optional.of(foo)
    .flatMap(value => Optional.of(value.toUpperCase()))
    .get();
  expect(upperFoo).toEqual('FOO');
});

test('Optional of null else is other', () => {
  const foo = 'foo';
  expect(
    Optional.of('bar')
      .filter(value => false)
      .orElse(foo),
  ).toBe(foo);
});

test('Optional of value else is value', () => {
  const foo = 'foo';
  expect(Optional.ofNullable(foo).orElse('bar')).toBe(foo);
});

test('Optional of null else get is other', () => {
  const foo = 'foo';
  const callback = jest.fn(() => foo);
  expect(
    Optional.ofNullable('bar')
      .filter(value => false)
      .orElseGet(callback),
  ).toBe(foo);
});

test('Optional of value else get is value', () => {
  const foo = 'foo';
  const callback = jest.fn();
  const elseFoo = Optional.ofNullable(foo).orElseGet(callback);
  expect(elseFoo).toBe(foo);
  expect(callback.mock.calls.length).toBe(0);
});

test('Optional of null else throw is throw', () => {
  const message = 'foo message';
  const callback = jest.fn(() => new Error(message));
  expect(() => Optional.ofNullable(null).orElseThrow(callback)).toThrow(message);
});

test('Optional of value else throw is value', () => {
  const foo = 'foo';
  const callback = jest.fn(() => new Error());
  expect(Optional.ofNullable(foo).orElseThrow(callback)).toBe(foo);
});

test('Optional of value else throw error is message', () => {
  const message = 'foo message';
  expect(() => Optional.ofNullable(null).orElseThrowError(message)).toThrowError(message);
});

test('Optional equality', () => {
  expect(Optional.ofNullable(null)).toEqual(Optional.ofNullable(null));
  expect(Optional.ofNullable('foo')).toEqual(Optional.ofNullable('foo'));
  expect(Optional.ofNullable(null)).not.toEqual(Optional.ofNullable('foo'));
  expect(Optional.ofNullable('bar')).not.toEqual(Optional.ofNullable('foo'));
});

test('Optional to string', () => {
  expect(`${Optional.ofNullable(null)}`).toEqual('Optional.empty');
  expect(`${Optional.ofNullable('foo')}`).toEqual('Optional[foo]');
});
