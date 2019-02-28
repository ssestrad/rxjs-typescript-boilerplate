export function tif(conditional: boolean | string): (str: string) => string {
  return (str: string): string => (conditional ? str : '');
}

export default {
  tif,
};
