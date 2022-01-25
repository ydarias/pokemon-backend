export interface Pokemon {
  id: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  weight: Measurement;
  height: Measurement;
  fleeRate: number;
  evolutionRequirements?: {
    amount: number;
    name: string;
  };
  evolutions?: {
    id: string;
    name: string;
  }[];
  previousEvolutions?: {
    id: string;
    name: string;
  }[];
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
}

export interface Measurement {
  maximum: number;
  minimum: number;
  unit: string;
}

export interface Attack {
  name: string;
  type: string;
  damage: number;
}
