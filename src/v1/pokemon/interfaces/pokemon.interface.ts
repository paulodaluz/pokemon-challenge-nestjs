export interface Pokemon {
  name: string;
  moves: Array<string>;
  type: string;
  stats: Stats
}

export interface Stats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
};
