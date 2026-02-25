export { ChurchSuite } from './client.js';

// Config
export type { ChurchSuiteConfig } from './types/config.js';

// Errors
export {
  ChurchSuiteError,
  ChurchSuiteHttpError,
  ChurchSuiteNotFoundError,
  ChurchSuiteValidationError,
} from './http/errors.js';

// Pagination
export type { Pagination, PaginatedResponse, PaginationParams } from './types/pagination.js';

// Common types
export type { Image, Location, Communication } from './types/common.js';
export type { CustomField } from './types/custom-fields.js';

// Account types
export type { Module, Profile, WhoAmI } from './types/account.js';

// Address Book types
export type {
  Contact,
  ContactListParams,
  ContactListResponse,
  CreateContactData,
  UpdateContactData,
  Tag,
  TagListResponse,
  TagContactsParams,
  TagContactsResponse,
  Flow,
  FlowListResponse,
  FlowStage,
  FlowStagesResponse,
  FlowTracking,
  FlowTrackingResponse,
  AddFlowTrackingData,
  KeyDate,
  KeyDateListResponse,
  KeyDateContactsParams,
  KeyDateContactsResponse,
  ContactTagsResponse,
  ContactKeyDatesResponse,
} from './types/address-book.js';

// Calendar types
export type {
  Event,
  EventCategory,
  EventListParams,
  EventListResponse,
  CategoryListResponse,
} from './types/calendar.js';

// Children types
export type {
  Child,
  ChildListParams,
  ChildListResponse,
  CreateChildData,
  UpdateChildData,
  ChildTagsResponse,
  ChildKeyDatesResponse,
  ChildGroupsResponse,
} from './types/children.js';

// Small Groups types
export type {
  Group,
  GroupListParams,
  GroupListResponse,
  GroupMember,
  GroupMembersResponse,
  SetMembersData,
  Cluster,
  ClusterListResponse,
} from './types/small-groups.js';

// My types
export type {
  MyDetails,
  MyDetailsResponse,
  MyContactsResponse,
  MyChildrenResponse,
} from './types/my.js';

// Embed types
export type {
  EmbedEvent,
  EmbedCalendarParams,
  EmbedGroup,
  EmbedSmallGroupsParams,
} from './types/embed.js';
