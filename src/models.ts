export interface PokemonResponse {
  id: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  fleeRate: number;
  evolutionRequirements?: {
    amount: number;
    name: string;
  };
  evolutions?: {
    id: string;
    name: string;
  }[];
  'Previous evolution(s)'?: {
    id: string;
    name: string;
  }[];
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: AttackResponse[];
    special: AttackResponse[];
  };
}

export interface AttackResponse {
  name: string;
  type: string;
  damage: number;
}

export interface CollectionOf<T> {
  items: T[];
  meta: {
    skip: number;
    limit: number;
    count: number;
  };
}

export interface UserPreferencesResponse {
  userID: string;
  favoritePokemons: string[];
}

export interface PokemonFavoritesUpdateRequest {
  add: string[];
  remove: string[];
}
