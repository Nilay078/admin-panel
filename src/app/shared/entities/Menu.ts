import { BaseEntity } from './BaseEntity';

export class Menu extends BaseEntity {
    text!: string;
    icon!: string;
    routerLink!: string;
    children!: Menu[];
    active!: boolean;
}
