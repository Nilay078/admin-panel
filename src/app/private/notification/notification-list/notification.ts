import { KeyValue } from '../../../common/common-entities/entity';

export interface Notification {
    id: string;
    name: string;
    email: boolean;
    description: string;
    time: string;
    day?: KeyValue;
    triggerId: KeyValue;
    type: string;
}
