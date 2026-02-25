import type { BaseClient } from '../../http/base-client.js';
import type { CategoryListResponse } from '../../types/calendar.js';

export class CategoriesResource {
  constructor(private readonly client: BaseClient) {}

  async list(): Promise<CategoryListResponse> {
    return this.client.get<CategoryListResponse>('/v1/calendar/categories');
  }
}
