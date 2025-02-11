interface ListData<T> {
  results: T[];
  total: number;
  nextId?: number;
}

interface Filters {
  limit?: number;
  nextId?: string;
}

export type { ListData, Filters };
