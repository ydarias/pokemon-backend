export interface Pokemon {
  id: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  weight: {
    maximum: number;
    minimum: number;
    unit: string;
  };
  height: {
    maximum: number;
    minimum: number;
    unit: string;
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
  previousEvolutions?: {
    id: string;
    name: string;
  }[];
  maxCP: number;
  maxHP: number;
  attacks: {
    fast: {
      name: string;
      type: string;
      damage: number;
    }[];
    special: {
      name: string;
      type: string;
      damage: number;
    }[];
  };
}
