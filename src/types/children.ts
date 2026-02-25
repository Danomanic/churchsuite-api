import type { Image, Communication } from './common.js';
import type { CustomField } from './custom-fields.js';
import type { Pagination, PaginationParams } from './pagination.js';

export interface Child {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  sex: string | null;
  date_of_birth: string | null;
  mobile: string;
  email: string;
  telephone: string;
  address: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  school: string;
  medical: string;
  doctor: string;
  special_needs: string;
  communication: Communication;
  status: string;
  site_id: number | null;
  images: Image;
  custom_fields: Record<string, CustomField>;
}

export interface ChildListParams extends PaginationParams {
  q?: string;
  name?: string;
  tags?: string;
  tag_id?: number;
  view?: string;
}

export interface ChildListResponse {
  pagination: Pagination;
  children: Child[];
}

export interface CreateChildData {
  first_name: string;
  last_name: string;
  email?: string;
  telephone?: string;
  mobile?: string;
  sex?: string;
  date_of_birth?: string;
  [key: string]: unknown;
}

export interface UpdateChildData {
  first_name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  mobile?: string;
  sex?: string;
  date_of_birth?: string;
  [key: string]: unknown;
}

export interface ChildTagsResponse {
  tags: Array<{
    id: number;
    name: string;
    colour: string;
  }>;
}

export interface ChildKeyDatesResponse {
  keydates: Array<{
    id: number;
    name: string;
    date: string;
  }>;
}

export interface ChildGroupsResponse {
  groups: Array<{
    id: number;
    name: string;
  }>;
}
