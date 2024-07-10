import { KeyValue } from '../../../common/common-entities/entity';

export interface EditNotification {
    day?: KeyValue;
    time?: string;
    email: boolean;
    description?: string;
    emailContentView: EmailContentView;
    id: string;
    name: string;
    triggerId: KeyValue;
    type: string;
}

export interface EmailContentView {
    content: string;
    default: boolean;
    id: string;
    subject: boolean;
}

export function tinyMceToolBar() {
    return `undo redo | 
    alignleft aligncenter alignright alignjustify | 
    bullist numlist outdent indent code`;
}
