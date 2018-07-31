

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class CommunicateService {
    private subject = new Subject<any>();

    sendMessage(message: any) {
        this.subject.next({ mess: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
