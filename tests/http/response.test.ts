import { handleResponse } from '../../src/http/response.js';
import {
  ChurchSuiteHttpError,
  ChurchSuiteNotFoundError,
  ChurchSuiteValidationError,
} from '../../src/http/errors.js';

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

describe('handleResponse', () => {
  it('returns parsed JSON on 200', async () => {
    const data = { id: 1, name: 'Alice' };
    const result = await handleResponse(jsonResponse(200, data));

    expect(result).toEqual(data);
  });

  it('returns undefined on 204', async () => {
    const response = new Response(null, { status: 204 });
    const result = await handleResponse(response);

    expect(result).toBeUndefined();
  });

  it('throws ChurchSuiteValidationError on 400', async () => {
    const body = { error: 'Validation failed', errors: { name: ['is required'] } };

    await expect(handleResponse(jsonResponse(400, body))).rejects.toThrow(
      ChurchSuiteValidationError,
    );
  });

  it('throws ChurchSuiteNotFoundError on 404', async () => {
    const body = { error: 'Not found' };

    await expect(handleResponse(jsonResponse(404, body))).rejects.toThrow(
      ChurchSuiteNotFoundError,
    );
  });

  it('throws ChurchSuiteHttpError on 500', async () => {
    const body = { error: 'Internal server error' };

    await expect(handleResponse(jsonResponse(500, body))).rejects.toThrow(
      ChurchSuiteHttpError,
    );
  });
});
