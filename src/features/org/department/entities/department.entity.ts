import { AuditColumns } from 'src/common/base/audit.columns';
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DepartmentStatus } from '../enums/department-status.enum';

@Entity('org_departments')
export class DepartmentEntity extends BaseEntity {
  /**
   * Parent department
   *
   * Example:
   *
   * Engineering
   *      |
   *      +-- Backend
   *
   */
  @Column({
    name: 'parent_id',
    type: 'bigint',
    nullable: true,
  })
  parentId?: number;

  @ManyToOne(() => DepartmentEntity, (department) => department.children, {
    nullable: true,
  })
  @JoinColumn({
    name: 'parent_id',
  })
  parent?: DepartmentEntity;

  @OneToMany(() => DepartmentEntity, (department) => department.parent)
  children?: DepartmentEntity[];

  @Column({
    length: 50,
    unique: true,
  })
  code!: string;

  @Column({
    length: 200,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  /**
   * Department manager user id
   */
  @Column({
    name: 'manager_id',
    type: 'bigint',
    nullable: true,
  })
  managerId?: number;

  @Column({
    type: 'enum',
    enum: DepartmentStatus,
    default: DepartmentStatus.ACTIVE,
  })
  status?: DepartmentStatus;

  @Column(() => AuditColumns, {
    prefix: '',
  })
  audit?: AuditColumns;
}
