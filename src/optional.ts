/**
 * A container object which may or may not contain a non-null value.
 * Ported from Java 8's java.util.Optional utility.
 */
export default class Optional<T> {
  /**
   * Common instance for empty()
   */
  private static EMPTY: Optional<any> = new Optional(null);

  /**
   * If non-null, the value; if null, indicates no value is present
   */
  private value: T;

  /**
   * Returns an empty instance.  No value is present for this optional.
   *
   * Test if an object is empty by using isPresent()
   */
  public static empty(): Optional<any> {
    return Optional.EMPTY;
  }

  /**
   * Constructs an instance with the value present.
   * @param value the value to be present
   */
  private constructor(value: T) {
    this.value = value;
  }

  /**
   * Returns an Optional describing the specified, present non-null value.
   * @param value the value to be present
   */
  public static of<U>(value: U): Optional<U> {
    return new Optional(value);
  }

  /**
   * Returns an Optional describing the specified value, if non-null, otherwise returns
   * and empty Optional.
   * @param value the possibly-null value to describe
   */
  public static ofNullable<U>(value: U | null | undefined): Optional<U> {
    if (value == null || value === undefined) {
      return Optional.EMPTY;
    }
    return new Optional(value);
  }

  /**
   * If a value is present in this Optional, returns the value.
   */
  public get(): T {
    return this.value;
  }

  /**
   * Return true if there is a value present, otherwise return false
   */
  public isPresent(): boolean {
    return this.exists();
  }

  /**
   * If a value is present, invoke the specified consumer with the value, otherwise
   * do nothing.
   * @param consumer block to be executed if a value is present
   */
  public ifPresent<U>(consumer: (arg: T) => U | null | undefined) {
    if (this.exists()) {
      consumer(this.value);
    }
  }

  /**
   * If a value is present, invoke the specified consumer with the value, otherwise
   * do nothing.
   * Always return this Optional.
   * @param consumer block to be executed if a value is present
   */
  public peek<U>(consumer: (arg: T) => U | null | undefined): Optional<T> {
    if (this.exists()) {
      consumer(this.value);
    }
    return this;
  }

  /**
   * If a value is present, and the value matches the given predicate,
   * return an Optional describing the value, otherwise return an
   * empty Optional.
   *
   * @param predicate a predicate to apply to the value, if present
   */
  public filter(predicate: (arg: T) => boolean): Optional<T> {
    if (predicate(this.value)) {
      return this;
    } else {
      return Optional.EMPTY;
    }
  }

  /**
   * If a value is present, apply the provided mapping function to it,
   * and if the result is non-null, return an Optional describing the
   * result.  Otherwise return an empty Optional.
   *
   * @param mapper a mapping function to apply to the value if present
   */
  public map<U>(mapper: (arg: T) => U | null | undefined): Optional<U> {
    return this.exists() ? Optional.ofNullable(mapper(this.value)) : Optional.EMPTY;
  }

  /**
   * If a value is present, apply the provided Optional-bearing
   * mapping function to it, return that result, otherwise return an empty
   * Optional.  This method is similar to map(Function),
   * but the provided mapper is one whose result is already an Optional,
   * and if invoked, flatMap does not wrap it with an additional
   * Optional.
   *
   * @param mapper a mapping function to apply to the value if present.
   */
  public flatMap<U>(mapper: (arg: T) => Optional<U>): Optional<U> {
    return this.exists() ? mapper(this.value) : Optional.EMPTY;
  }

  /**
   * Return the value if present, otherwise return other.
   *
   * @param other the value to be returned if there is no value present, may be null
   */
  public orElse(other: T | null | undefined): T | null | undefined {
    return this.exists() ? this.value : other;
  }

  /**
   * Return the value if present, otherwise invoke the getter and return the
   * result of that invocation
   *
   * @param getter a function whose result is returned if no value is present
   */
  public orElseGet(getter: () => T): T {
    return this.exists() ? this.value : getter();
  }

  /**
   * Return the contained value, if present, otherwise throw an Error to be
   * created by the provided supplier.
   *
   * @param errorSupplier the supplier which will return the exception to be thrown
   */
  public orElseThrow(errorSupplier: () => Error): T {
    if (this.notExists()) {
      throw errorSupplier();
    }
    return this.value;
  }

  /**
   * Return the contained value, if present, otherwise throw an Error with the
   * provided message.
   *
   * @param message the error message used if an error is thrown
   */
  public orElseThrowError(message: string): T {
    return this.orElseThrow(() => new Error(message));
  }

  /**
   * Returns a non-empty string representation of this Optional suitable for debugging.
   */
  public toString(): string {
    return this.exists() ? `Optional[${this.value}]` : 'Optional.empty';
  }

  private notExists(): boolean {
    return !this.exists();
  }

  private exists(): boolean {
    return this.value !== null && this.value !== undefined;
  }
}
