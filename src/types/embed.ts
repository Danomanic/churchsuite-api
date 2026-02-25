export interface EmbedEvent {
  id: number;
  identifier: string;
  name: string;
  datetime_start: string;
  datetime_end: string;
  all_day: boolean;
  description: string;
  category: {
    id: number;
    name: string;
    colour: string;
  } | null;
  images: Record<string, string>;
  location: {
    name: string;
    address: string;
    latitude: string | null;
    longitude: string | null;
  } | null;
  signup_options: Record<string, unknown>;
  url: string;
}

export interface EmbedCalendarParams {
  num_results?: number;
  date_start?: string;
  date_end?: string;
  category?: string;
  site_ids?: string;
  featured?: boolean;
  merge?: string;
}

export interface EmbedGroup {
  id: number;
  identifier: string;
  name: string;
  description: string;
  day: string;
  time: string;
  frequency: string;
  location: {
    name: string;
    address: string;
    latitude: string | null;
    longitude: string | null;
  } | null;
  images: Record<string, string>;
  signup_options: Record<string, unknown>;
  url: string;
}

export interface EmbedSmallGroupsParams {
  num_results?: number;
  cluster_id?: number;
  site_ids?: string;
  merge?: string;
}
