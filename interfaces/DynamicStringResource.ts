export interface DynamicStringResource {
  get(state: { [key: string]: any }): { [key: string]: string };
}
