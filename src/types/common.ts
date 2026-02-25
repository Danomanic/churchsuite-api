export interface Image {
  px_16: string;
  px_50: string;
  px_100: string;
  px_150: string;
  px_300: string;
  px_original: string;
}

export interface Location {
  address: string;
  address2: string;
  address3: string;
  city: string;
  county: string;
  postcode: string;
  country: string;
  latitude: string | null;
  longitude: string | null;
}

export interface Communication {
  general_email: number;
  general_sms: number;
  phone: string;
  email: string;
}
