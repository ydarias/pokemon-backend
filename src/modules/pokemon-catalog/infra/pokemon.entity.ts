import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MeasurementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float' })
  maximum: number;

  @Column({ type: 'float' })
  minimum: number;

  @Column()
  unit: string;
}

@Entity()
export class EvolutionRequirementsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amount: number;

  @Column()
  name: string;
}

@Entity()
export class PokemonEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  @Index()
  nameForSearch: string;

  @Column()
  classification: string;

  @ManyToMany(() => TypeEntity, { eager: true })
  @JoinTable()
  types: TypeEntity[];

  @ManyToMany(() => TypeEntity, { eager: true })
  @JoinTable()
  resistant: TypeEntity[];

  @ManyToMany(() => TypeEntity, { eager: true })
  @JoinTable()
  weaknesses: TypeEntity[];

  @OneToOne(() => MeasurementEntity, { eager: true })
  @JoinColumn()
  weight: MeasurementEntity;

  @OneToOne(() => MeasurementEntity, { eager: true })
  @JoinColumn()
  height: MeasurementEntity;

  @Column({ type: 'float' })
  fleeRate: number;

  @OneToOne(() => EvolutionRequirementsEntity, { eager: true })
  @JoinColumn()
  evolutionRequirements?: EvolutionRequirementsEntity;

  @ManyToMany(() => EvolutionEntity, { eager: true })
  @JoinTable()
  evolutions?: EvolutionEntity[];

  @ManyToMany(() => EvolutionEntity, { eager: true })
  @JoinTable()
  previousEvolutions?: EvolutionEntity[];

  @Column()
  maxCP: number;

  @Column()
  maxHP: number;

  @ManyToMany(() => AttackEntity, { eager: true })
  @JoinTable()
  fastAttacks: AttackEntity[];

  @ManyToMany(() => AttackEntity, { eager: true })
  @JoinTable()
  specialAttacks: AttackEntity[];
}

@Entity()
export class TypeEntity {
  @PrimaryColumn()
  name: string;
}

@Entity()
export class AttackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  damage: number;
}

@Entity()
export class EvolutionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
}
