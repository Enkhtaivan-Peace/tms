import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';

import { BaseEntity } from 'src/common/base/base.entity';

import { WorkItemEntity } from '../../work-item/entities/work-item.entity';
import { User } from 'src/features/iam/entities/user.entity';

@Entity('work_comments')
export class WorkCommentEntity extends BaseEntity {
  @Column({ name: 'work_item_id', type: 'bigint' })
  workItemId!: number;

  @Column({
    name: 'parent_comment_id',
    type: 'bigint',
    nullable: true,
  })
  parentCommentId?: number;

  @Column({ name: 'author_id', type: 'bigint' })
  authorId!: number;

  @Column({
    type: 'text',
  })
  content!: string;

  @Column({
    name: 'is_edited',
    type: 'boolean',
    default: false,
  })
  isEdited!: boolean;

  @ManyToOne(() => WorkItemEntity, (workItem) => workItem.comments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'work_item_id',
  })
  workItem!: WorkItemEntity;

  @ManyToOne(() => User, {
    eager: true,
  })
  @JoinColumn({
    name: 'author_id',
  })
  author!: User;

  @ManyToOne(() => WorkCommentEntity, (comment) => comment.replies, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'parent_comment_id',
  })
  parent?: WorkCommentEntity;

  @OneToMany(() => WorkCommentEntity, (comment) => comment.parent)
  replies!: WorkCommentEntity[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
  })
  updatedAt!: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date | null;
}
