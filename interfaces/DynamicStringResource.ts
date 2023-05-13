export interface DynamicStringResource {
  get(name: string, state: { [key: string]: any }): string;
}
