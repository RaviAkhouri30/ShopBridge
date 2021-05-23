/**
 * @description Using Generics for Result, Common Response Model
 */

export class ResponseResult<T> {

    public get message(): string {
        return this.message;
    }

    public set message(message: string) {
        this.message = message;
    }

    public get result(): T {
        return this.result;
    }

    public set result(result: T) {
        this.result = result;
    }

    public get status(): number {
        return this.status;
    }

    public set status(status: number) {
        this.status = status;
    }

}
