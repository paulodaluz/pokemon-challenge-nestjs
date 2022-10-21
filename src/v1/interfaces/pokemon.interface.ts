export interface PokemonResponse {
  name: string;
  moves: Array<string>;
  type: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
}
