/**
 * Define common typings used everywhere
 */

// Utility type to convert snake_case to camelCase
type SnakeToCamelCase<S extends string> = S extends `${infer T}_${infer U}` ? `${T}${Capitalize<SnakeToCamelCase<U>>}` : S;

// Mapped type to convert all keys of a given type to camelCase
export type CamelCaseKeys<T> = {
  [K in keyof T as SnakeToCamelCase<string & K>]: T[K];
};
