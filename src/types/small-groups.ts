import type { Image, Location } from './common.js';
import type { CustomField } from './custom-fields.js';
import type { Pagination, PaginationParams } from './pagination.js';

export interface Group {
  id: number;
  identifier: string;
  name: string;
  description: string;
  date_start: string;
  date_end: string;
  frequency: string;
  day: string;
  time: string;
  location: Location | null;
  cluster_id: number | null;
  no_members: number;
  status: string;
  site_id: number | null;
  images: Image;
  custom_fields: Record<string, CustomField>;
}

export interface GroupListParams extends PaginationParams {
  view?: string;
  cluster_id?: number;
  site_id?: number;
  q?: string;
}

export interface GroupListResponse {
  pagination: Pagination;
  groups: Group[];
}

export interface GroupMember {
  id: number;
  contact_id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  telephone: string;
  mobile: string;
  status: string;
  roles: string;
  images: Image;
}

export interface GroupMembersResponse {
  members: GroupMember[];
}

export interface SetMembersData {
  members: Array<{
    contact_id: number;
    roles?: string;
  }>;
}

export interface Cluster {
  id: number;
  name: string;
  description: string;
  no_groups: number;
}

export interface ClusterListResponse {
  clusters: Cluster[];
}
