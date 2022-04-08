export type EnumValues<T> = T[keyof T];

// Taken from: https://habr.com/ru/company/alfa/blog/452620/
// Checks if the value is similar to 'action'
export type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;
