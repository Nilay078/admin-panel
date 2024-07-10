import { KeyValue } from '../../common/common-entities/entity';

export interface Login {
    active: boolean;
    email: string;
    firstName: string;
    hasLoggedIn: boolean;
    id: string;
    lastName: string;
    mobile: string;
    moduleViews: ModuleView[];
    roleView: RoleView;
    shortFormOfName: string;
    verified: boolean;
}

export interface ModuleView {
    id: number;
    name: string;
    rightsViews: IDName[];
}

export interface RoleView {
    id: string;
    name: string;
    typeId: KeyValue;
}

export interface IDName {
    id: number;
    name: string;
}
