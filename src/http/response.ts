import {
  ChurchSuiteHttpError,
  ChurchSuiteNotFoundError,
  ChurchSuiteValidationError,
} from './errors.js';

export async function handleResponse<T>(response: Response): Promise<T> {
  if (response.status === 204) {
    return undefined as T;
  }

  const body = await response.json().catch(() => null);

  if (response.ok) {
    return body as T;
  }

  if (response.status === 400) {
    throw new ChurchSuiteValidationError(body);
  }

  if (response.status === 404) {
    throw new ChurchSuiteNotFoundError(body);
  }

  throw new ChurchSuiteHttpError(response.status, body);
}
