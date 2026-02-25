import type { BaseClient } from '../../http/base-client.js';
import type {
  Flow,
  FlowListResponse,
  FlowStagesResponse,
  FlowTrackingResponse,
  AddFlowTrackingData,
  FlowTracking,
} from '../../types/address-book.js';

export class FlowsResource {
  constructor(private readonly client: BaseClient) {}

  async list(): Promise<FlowListResponse> {
    return this.client.get<FlowListResponse>('/v1/addressbook/flows');
  }

  async get(id: number): Promise<Flow> {
    return this.client.get<Flow>(`/v1/addressbook/flow/${id}`);
  }

  async getStages(id: number): Promise<FlowStagesResponse> {
    return this.client.get<FlowStagesResponse>(
      `/v1/addressbook/flow/${id}/stages`,
    );
  }

  async getTracking(id: number): Promise<FlowTrackingResponse> {
    return this.client.get<FlowTrackingResponse>(
      `/v1/addressbook/flow/${id}/tracking`,
    );
  }

  async addTracking(
    id: number,
    data: AddFlowTrackingData,
  ): Promise<FlowTracking> {
    return this.client.post<FlowTracking>(
      `/v1/addressbook/flow/${id}/tracking`,
      data,
    );
  }
}
