import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sermons')
export class Sermon {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 500 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  scripture: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'varchar', length: 500, nullable: true })
  youtubeId: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  audioUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  thumbnail: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  preacher: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
