export class SieveModel {
  sorts: string[] | undefined;
  filters: { [key: string]: any } = {}; // Promenjena struktura filters
  page: number | undefined;
  pageSize: number | undefined;
}
