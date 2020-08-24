import { BehaviorSubject } from 'rxjs';

export class ErrorFacade {
    private errorSubject = new BehaviorSubject<Error>(null);
    errorObservable = this.errorSubject.asObservable();
    constructor() { }

    passError(error: Error) {
        this.errorSubject.next(error);
    }
}
