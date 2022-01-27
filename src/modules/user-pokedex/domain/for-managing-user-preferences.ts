import { UserPreferences } from './user-preferences.model';

export interface ForManagingUserPreferences {
  getPreferences(userID: string): Promise<UserPreferences>;
  markFavoritePokemon(userId: string, pokemon: string): Promise<UserPreferences>;
  unmarkFavoritePokemon(userID: string, pokemon: string): Promise<UserPreferences>;
}
