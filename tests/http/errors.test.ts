import {
  ChurchSuiteError,
  ChurchSuiteHttpError,
  ChurchSuiteNotFoundError,
  ChurchSuiteValidationError,
} from '../../src/http/errors.js';

describe('ChurchSuiteError', () => {
  it('sets message and name', () => {
    const error = new ChurchSuiteError('something broke');

    expect(error.message).toBe('something broke');
    expect(error.name).toBe('ChurchSuiteError');
    expect(error).toBeInstanceOf(Error);
  });
});

describe('ChurchSuiteHttpError', () => {
  it('sets status and body', () => {
    const body = { detail: 'bad request' };
    const error = new ChurchSuiteHttpError(422, body);

    expect(error.status).toBe(422);
    expect(error.body).toBe(body);
    expect(error.name).toBe('ChurchSuiteHttpError');
    expect(error).toBeInstanceOf(ChurchSuiteError);
  });

  it('extracts error message from body', () => {
    const error = new ChurchSuiteHttpError(500, { error: 'Internal failure' });

    expect(error.message).toBe('Internal failure');
  });

  it('falls back to HTTP status when body has no error field', () => {
    const error = new ChurchSuiteHttpError(503, { something: 'else' });

    expect(error.message).toBe('HTTP 503');
  });

  it('falls back to HTTP status when body is null', () => {
    const error = new ChurchSuiteHttpError(500, null);

    expect(error.message).toBe('HTTP 500');
  });
});

describe('ChurchSuiteNotFoundError', () => {
  it('sets status to 404', () => {
    const error = new ChurchSuiteNotFoundError({ error: 'Not found' });

    expect(error.status).toBe(404);
    expect(error.name).toBe('ChurchSuiteNotFoundError');
    expect(error.message).toBe('Not found');
    expect(error).toBeInstanceOf(ChurchSuiteHttpError);
  });
});

describe('ChurchSuiteValidationError', () => {
  it('sets status to 400', () => {
    const body = {
      error: 'Validation failed',
      errors: { name: ['is required'] },
    };
    const error = new ChurchSuiteValidationError(body);

    expect(error.status).toBe(400);
    expect(error.name).toBe('ChurchSuiteValidationError');
    expect(error).toBeInstanceOf(ChurchSuiteHttpError);
  });

  it('extracts errors from body', () => {
    const errors = { email: ['is invalid', 'is taken'], name: ['is required'] };
    const error = new ChurchSuiteValidationError({ error: 'Validation failed', errors });

    expect(error.errors).toEqual(errors);
  });

  it('defaults errors to empty object when body has no errors field', () => {
    const error = new ChurchSuiteValidationError({ error: 'Validation failed' });

    expect(error.errors).toEqual({});
  });

  it('defaults errors to empty object when body is null', () => {
    const error = new ChurchSuiteValidationError(null);

    expect(error.errors).toEqual({});
  });
});
