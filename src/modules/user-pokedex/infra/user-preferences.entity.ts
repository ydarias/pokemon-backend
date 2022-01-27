import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class UserPreferencesEntity {
  @PrimaryColumn()
  userID: string;

  @Column('text', { array: true, default: '{}' })
  favoritePokemons: string[];
}
