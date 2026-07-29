export interface DepartmentTree {
  id: number;

  name: string;

  code: string;

  children: DepartmentTree[];
}
