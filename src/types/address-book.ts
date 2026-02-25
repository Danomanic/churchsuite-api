import type { Image, Communication } from './common.js';
import type { CustomField } from './custom-fields.js';
import type { Pagination, PaginationParams } from './pagination.js';

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  middle_name: string;
  formal_name: string;
  maiden_name: string;
  sex: string | null;
  date_of_birth: string | null;
  marital: string;
  spouse_id: number | null;
  address: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
  telephone: string;
  mobile: string;
  work_telephone: string;
  email: string;
  employer: string;
  job: string;
  communication: Communication;
  status: string;
  site_id: number | null;
  images: Image;
  custom_fields: Record<string, CustomField>;
}

export interface ContactListParams extends PaginationParams {
  q?: string;
  name?: string;
  tags?: string;
  tag_id?: number;
  view?: string;
}

export interface ContactListResponse {
  pagination: Pagination;
  contacts: Contact[];
}

export interface CreateContactData {
  first_name: string;
  last_name: string;
  email?: string;
  telephone?: string;
  mobile?: string;
  sex?: string;
  date_of_birth?: string;
  address?: string;
  address2?: string;
  address3?: string;
  city?: string;
  county?: string;
  postcode?: string;
  country?: string;
  [key: string]: unknown;
}

export interface UpdateContactData {
  first_name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
  mobile?: string;
  sex?: string;
  date_of_birth?: string;
  address?: string;
  address2?: string;
  address3?: string;
  city?: string;
  county?: string;
  postcode?: string;
  country?: string;
  [key: string]: unknown;
}

export interface Tag {
  id: number;
  tag_id: number;
  name: string;
  description: string;
  colour: string;
  type: string;
  no_contacts: number;
}

export interface TagListResponse {
  pagination: Pagination;
  tags: Tag[];
}

export interface TagContactsParams extends PaginationParams {
  q?: string;
  view?: string;
}

export interface TagContactsResponse {
  pagination: Pagination;
  contacts: Contact[];
}

export interface Flow {
  id: number;
  name: string;
  no_stages: number;
  no_people: number;
}

export interface FlowListResponse {
  flows: Flow[];
}

export interface FlowStage {
  id: number;
  name: string;
  order: number;
  no_people: number;
}

export interface FlowStagesResponse {
  stages: FlowStage[];
}

export interface FlowTracking {
  id: number;
  contact_id: number;
  stage_id: number;
  created_at: string;
}

export interface FlowTrackingResponse {
  tracking: FlowTracking[];
}

export interface AddFlowTrackingData {
  contact_id: number;
  stage_id?: number;
}

export interface KeyDate {
  id: number;
  name: string;
  description: string;
  colour: string;
  no_contacts: number;
}

export interface KeyDateListResponse {
  keydates: KeyDate[];
}

export interface KeyDateContactsParams extends PaginationParams {
  q?: string;
}

export interface KeyDateContactsResponse {
  pagination: Pagination;
  contacts: Contact[];
}

export interface ContactTagsResponse {
  tags: Tag[];
}

export interface ContactKeyDatesResponse {
  keydates: Array<{
    id: number;
    name: string;
    date: string;
    description: string;
  }>;
}
