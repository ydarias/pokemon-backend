import { ForManagingUserPreferences } from './for-managing-user-preferences';
import { ForStoringAndGettingUserPreferences } from './for-storing-getting-user-preferences';
import { UserPreferences } from './user-preferences.model';
import * as _ from 'lodash';

export class UserPokedex implements ForManagingUserPreferences {
  constructor(private readonly preferencesRepository: ForStoringAndGettingUserPreferences) {}

  async markFavoritePokemon(userId: string, pokemon: string): Promise<UserPreferences> {
    const preferences = await this.preferencesRepository.findUserPreferences(userId);
    preferences.favoritePokemons = _.union(preferences.favoritePokemons, [pokemon]);

    return this.preferencesRepository.updateUserPreferences(preferences);
  }
}
