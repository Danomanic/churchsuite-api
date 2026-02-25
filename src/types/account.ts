export interface Module {
  id: string;
  name: string;
  order: number;
  options: Record<string, unknown>;
}

export interface Profile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  modules: string[];
}

export interface WhoAmI {
  username: string;
  contact_id: number | null;
  type: string;
  modules: string[];
}
