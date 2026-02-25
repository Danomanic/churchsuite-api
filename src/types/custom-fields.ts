export interface CustomField {
  id: number;
  resource_type: string;
  order: number;
  type: string;
  name: string;
  help: string;
  options: string[];
  formatted_value: string;
  value: string;
}
