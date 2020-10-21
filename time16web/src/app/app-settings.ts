export class AppSettings {
  public static API_ENDPOINT: string = 'http://localhost:5000/api';
  public static CONF_SNACK: any = { duration: 5000 };
}

export function formatNumeroProcesso(numProcesso: string): string {
  let regex: string = '(\\d{7})(\\d{2})(\\d{4})(\\d{1})(\\d{2})(\\d{4})';
  let re = new RegExp(regex, 'g');
  let match = re.exec(numProcesso);
  return [
    match[1] + '-' + match[2]+ '.',
    match[3] + '.',
    match[4]+ '.',
    match[5]+ '.',
    match[6],
    match[7]
  ].join('');
}
