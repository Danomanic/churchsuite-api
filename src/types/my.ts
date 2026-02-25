import type { Contact } from './address-book.js';
import type { Child } from './children.js';

export interface MyDetails {
  id: number;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  profile_image: string;
}

export interface MyDetailsResponse extends MyDetails {}

export interface MyContactsResponse {
  contacts: Contact[];
}

export interface MyChildrenResponse {
  children: Child[];
}
