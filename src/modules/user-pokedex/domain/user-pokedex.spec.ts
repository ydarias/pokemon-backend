import { Matcher, MatcherCreator, mock } from 'jest-mock-extended';
import * as _ from 'lodash';

export interface UserPreferences {
  userID: string;
  favoritePokemons: string[];
}

interface ForStoringAndGettingUserPreferences {
  findUserPreferences(userId: string): Promise<UserPreferences>;
  updateUserPreferences(preferences: UserPreferences): Promise<UserPreferences>;
}

interface ForManagingUserPreferences {
  markFavoritePokemon(userId: string, pokemon: string): Promise<UserPreferences>;
}

class UserPokedex implements ForManagingUserPreferences {
  constructor(private readonly preferencesRepository: ForStoringAndGettingUserPreferences) {}

  async markFavoritePokemon(userId: string, pokemon: string): Promise<UserPreferences> {
    const preferences = await this.preferencesRepository.findUserPreferences(userId);
    preferences.favoritePokemons = _.union(preferences.favoritePokemons, [pokemon]);

    return this.preferencesRepository.updateUserPreferences(preferences);
  }
}

export const aPreferencesLike: MatcherCreator<UserPreferences> = (expectedValue) =>
  new Matcher((actualValue) => {
    return (
      actualValue.userID === expectedValue.userID &&
      _.isEqual(actualValue.favoritePokemons, expectedValue.favoritePokemons)
    );
  }, 'Compares two instances of UserPreferences');

describe('A Pokedex', () => {
  it('should allow a user to mark a pokemon as favorite using a mocked adapter', async () => {
    const mockedPreferencesRepository = mock<ForStoringAndGettingUserPreferences>();
    const pokedex: ForManagingUserPreferences = new UserPokedex(mockedPreferencesRepository);

    const userID = 'the-user-id';

    const originalPreferences: UserPreferences = {
      userID,
      favoritePokemons: ['001'],
    };

    const updatedPreferences: UserPreferences = {
      userID,
      favoritePokemons: ['001', '002'],
    };

    mockedPreferencesRepository.findUserPreferences.calledWith(userID).mockResolvedValue(originalPreferences);
    mockedPreferencesRepository.updateUserPreferences
      .calledWith(aPreferencesLike(updatedPreferences))
      .mockResolvedValue(updatedPreferences);

    const result = await pokedex.markFavoritePokemon(userID, '002');

    expect(result).toStrictEqual(updatedPreferences);
    expect(mockedPreferencesRepository.updateUserPreferences).toHaveBeenCalledWith(
      aPreferencesLike(updatedPreferences),
    );
  });
});
