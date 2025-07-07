export interface Category {
    id: number;
    category_name: string;
    tag: number | null; // Or an object, depending on how the API returns it
    usage_frequency: number | null;
  }
    