export type Result<T = void> = {
    value?: T;
    errors: [];
    isSuccess: boolean;
}