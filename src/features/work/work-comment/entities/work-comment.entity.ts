import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';

import { WorkItemEntity } from '../../work-item/entities/work-item.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('work_comments')
export class WorkCommentEntity extends BaseEntity {
  @ManyToOne(() => WorkItemEntity, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'work_item_id',
  })
  workItem!: WorkItemEntity;

  @Column({
    name: 'work_item_id',
  })
  workItemId!: number;

  @ManyToOne(() => WorkCommentEntity, (comment) => comment.replies, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_id',
  })
  parent?: WorkCommentEntity;

  @Column({
    name: 'parent_id',
    nullable: true,
  })
  parentId?: number;

  @OneToMany(() => WorkCommentEntity, (comment) => comment.parent)
  replies!: WorkCommentEntity[];

  @Column({
    type: 'text',
  })
  content!: string;

  @Column({
    name: 'created_by',
  })
  createdBy!: number;

  @Column({
    name: 'updated_by',
    nullable: true,
  })
  updatedBy?: number;

  @Column({
    name: 'is_edited',
    default: false,
  })
  isEdited!: boolean;

  @Column({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt?: Date;
}
