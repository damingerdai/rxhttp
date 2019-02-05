export interface Model<T> {
    [key: string]: T;
}

export type Method = 'get' | 'post' | 'put' | 'delete';

//export type Observer<T> = { next: (value: T) => void; error: (value: any) => void; }