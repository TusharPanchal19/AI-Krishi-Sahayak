import { translations } from './constants/translations';

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'pa';

export interface FarmerData {
  state: string;
  district: string;
  crop: string;
  landSize: number;
  annualIncome: number;
  irrigationType: string;
}

export interface Scheme {
  name: string;
  description: string;
  states_allowed: string[];
  crops_allowed: string[] | "ALL";
  min_land_acres: number;
  max_land_acres: number;
  apply_link: string;
  last_updated: string;
  income_limit?: number;
  irrigation_bonus?: string[];
}

// A helper type to get all possible translation keys for reasons
export type ReasonKey = keyof typeof translations.en;

export interface Reason {
  key: ReasonKey;
  values?: Record<string, string | number>;
}

export interface RecommendedScheme extends Scheme {
  score: number;
  reasons: Reason[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}