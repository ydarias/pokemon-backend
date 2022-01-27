import { UserPreferences } from './user-preferences.model';

export interface ForStoringAndGettingUserPreferences {
  findUserPreferences(userId: string): Promise<UserPreferences>;
  updateUserPreferences(preferences: UserPreferences): Promise<UserPreferences>;
}
