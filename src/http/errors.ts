export class ChurchSuiteError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ChurchSuiteError';
  }
}

export class ChurchSuiteHttpError extends ChurchSuiteError {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    const message =
      typeof body === 'object' && body !== null && 'error' in body
        ? String((body as { error: unknown }).error)
        : `HTTP ${status}`;
    super(message);
    this.name = 'ChurchSuiteHttpError';
    this.status = status;
    this.body = body;
  }
}

export class ChurchSuiteNotFoundError extends ChurchSuiteHttpError {
  constructor(body: unknown) {
    super(404, body);
    this.name = 'ChurchSuiteNotFoundError';
  }
}

export class ChurchSuiteValidationError extends ChurchSuiteHttpError {
  readonly errors: Record<string, string[]>;

  constructor(body: unknown) {
    super(400, body);
    this.name = 'ChurchSuiteValidationError';
    this.errors =
      typeof body === 'object' && body !== null && 'errors' in body
        ? ((body as { errors: Record<string, string[]> }).errors ?? {})
        : {};
  }
}
