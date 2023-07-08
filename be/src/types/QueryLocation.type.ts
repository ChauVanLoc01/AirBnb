export type QueryLocation = {
  location_name?: string;
  city?: string;
  country?: string;
  page?: number;
  limit?: number;
  order_by_city?: 'asc' | 'desc';
  order_by_country?: 'asc' | 'desc';
};
