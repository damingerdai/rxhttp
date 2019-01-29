export interface Model<T> {
    [key: string]: T;
}

export type Method = 'get' | 'post' | 'put' | 'delete';