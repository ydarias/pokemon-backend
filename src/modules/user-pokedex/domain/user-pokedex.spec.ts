import { Matcher, MatcherCreator, mock } from 'jest-mock-extended';
import * as _ from 'lodash';
import { UserPreferences } from './user-preferences.model';
import { ForStoringAndGettingUserPreferences } from './for-storing-getting-user-preferences';
import { ForManagingUserPreferences } from './for-managing-user-preferences';
import { UserPokedex } from './user-pokedex';

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

  it('should allow a user to unmark a pokemon as favorite using a mocked adapter', async () => {
    const mockedPreferencesRepository = mock<ForStoringAndGettingUserPreferences>();
    const pokedex: ForManagingUserPreferences = new UserPokedex(mockedPreferencesRepository);

    const userID = 'the-user-id';

    const originalPreferences: UserPreferences = {
      userID,
      favoritePokemons: ['001', '002', '003'],
    };

    const updatedPreferences: UserPreferences = {
      userID,
      favoritePokemons: ['001', '003'],
    };

    mockedPreferencesRepository.findUserPreferences.calledWith(userID).mockResolvedValue(originalPreferences);
    mockedPreferencesRepository.updateUserPreferences
      .calledWith(aPreferencesLike(updatedPreferences))
      .mockResolvedValue(updatedPreferences);

    const result = await pokedex.unmarkFavoritePokemon(userID, '002');

    expect(result).toStrictEqual(updatedPreferences);
    expect(mockedPreferencesRepository.updateUserPreferences).toHaveBeenCalledWith(
      aPreferencesLike(updatedPreferences),
    );
  });
});
