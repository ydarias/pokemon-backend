import { UserPreferences } from './user-preferences.model';

export interface ForManagingUserPreferences {
  markFavoritePokemon(userId: string, pokemon: string): Promise<UserPreferences>;
  unmarkFavoritePokemon(userID: string, pokemon: string): Promise<UserPreferences>;
}
