export interface ChurchSuiteConfig {
  /** ChurchSuite account identifier (X-Account header) */
  account: string;
  /** Application name (X-Application header) */
  application: string;
  /** API key or login token (X-Auth header) */
  auth?: string;
  /** Override the base URL (default: https://api.churchsuite.com/v1) */
  baseUrl?: string;
  /** Override the fetch implementation (useful for testing) */
  fetch?: typeof fetch;
}
