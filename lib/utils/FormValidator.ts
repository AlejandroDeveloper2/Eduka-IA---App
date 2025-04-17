type ValidationFunction<K> = (value: K) => string | null;
export type ValidationSchema = ObjectValidator;

class StringFieldValidator {
  private validations: ValidationFunction<string>[] = [];
  private isOptional = false;

  public optional() {
    this.isOptional = true;
    return this;
  }

  public custom(validatorCallback: (value: unknown) => string | null) {
    this.validations.push(validatorCallback);
    return this;
  }

  public required(message: string) {
    this.validations.push((value) => (value === "" ? message : null));
    return this;
  }

  public email(message: string) {
    this.validations.push((value) =>
      typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ? null
        : message
    );
    return this;
  }

  public min(stringLength: number, message: string) {
    this.validations.push((value) =>
      typeof value === "string" && value.length >= stringLength ? null : message
    );
    return this;
  }

  public max(stringLength: number, message: string) {
    this.validations.push((value) =>
      typeof value === "string" && value.length <= stringLength ? null : message
    );
    return this;
  }

  public matchRegex(regex: RegExp, message: string) {
    this.validations.push((value) =>
      typeof value === "string" && regex.test(value) ? null : message
    );
    return this;
  }

  validate(value: string): string[] {
    if (this.isOptional && (value === undefined || value === null)) {
      return [];
    }
    const errors = this.validations
      .map((fn) => fn(value))
      .filter((error) => error !== null);

    return errors;
  }
}

class NumberFieldValidator {
  private validations: ValidationFunction<number>[] = [];
  private isOptional = false;

  public optional() {
    this.isOptional = true;
    return this;
  }

  public custom(validatorCallback: (value: unknown) => string | null) {
    this.validations.push(validatorCallback);
    return this;
  }

  public required(message: string) {
    this.validations.push((value) =>
      value === undefined || value === null ? message : null
    );
    return this;
  }

  public positive(message: string) {
    this.validations.push((value) =>
      typeof value === "number" || value > 0 ? message : null
    );
    return this;
  }

  public min(minValue: number, message: string) {
    this.validations.push((value) =>
      typeof value === "number" && value >= minValue ? null : message
    );
    return this;
  }

  public max(maxValue: number, message: string) {
    this.validations.push((value) =>
      typeof value === "string" && value <= maxValue ? null : message
    );
    return this;
  }

  validate(value: number): string[] {
    if (this.isOptional && (value === undefined || value === null)) {
      return [];
    }
    const errors = this.validations
      .map((fn) => fn(value))
      .filter((error) => error !== null);

    return errors;
  }
}

class ObjectValidator {
  private schema: Record<
    string,
    StringFieldValidator | NumberFieldValidator | ObjectValidator
  >;

  constructor(
    schema: Record<
      string,
      StringFieldValidator | NumberFieldValidator | ObjectValidator
    >
  ) {
    this.schema = schema;
  }

  validate<T>(data: T, path: string = "") {
    let errors: Record<keyof T, string[]> = Object({});

    for (const field in this.schema) {
      const fieldValidator = this.schema[field];
      const value = Object(data)[field];
      const fullPath = path ? `${path}.${field}` : field;

      if (fieldValidator instanceof ObjectValidator) {
        const nested = fieldValidator.validate(value || {}, fullPath);
        errors = { ...errors, ...nested.errors };
      } else {
        const fieldErrors = fieldValidator.validate(value as never);
        if (fieldErrors.length > 0) {
          Object(errors)[fullPath] = fieldErrors;
        }
      }
    }

    return { valid: Object.keys(errors).length === 0, errors };
  }
}

export default class Validator {
  public static string() {
    return new StringFieldValidator();
  }

  public static number() {
    return new NumberFieldValidator();
  }

  public static object<T>(
    schema: Record<
      keyof T,
      StringFieldValidator | NumberFieldValidator | ObjectValidator
    >
  ) {
    return new ObjectValidator(schema);
  }
}
