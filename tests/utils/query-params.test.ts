import { buildUrl } from '../../src/utils/query-params.js';

describe('buildUrl', () => {
  const base = 'https://api.churchsuite.com/v1';

  it('builds URL with path', () => {
    expect(buildUrl(base, '/contacts')).toBe(
      'https://api.churchsuite.com/contacts',
    );
  });

  it('appends query params', () => {
    const url = buildUrl(base, '/contacts', { page: 1, per_page: 25 });
    const parsed = new URL(url);

    expect(parsed.searchParams.get('page')).toBe('1');
    expect(parsed.searchParams.get('per_page')).toBe('25');
  });

  it('strips undefined and null params', () => {
    const url = buildUrl(base, '/contacts', {
      page: 1,
      status: undefined,
      tag: null,
    });
    const parsed = new URL(url);

    expect(parsed.searchParams.get('page')).toBe('1');
    expect(parsed.searchParams.has('status')).toBe(false);
    expect(parsed.searchParams.has('tag')).toBe(false);
  });

  it('handles empty params object', () => {
    const url = buildUrl(base, '/contacts', {});

    expect(url).toBe('https://api.churchsuite.com/contacts');
  });
});
