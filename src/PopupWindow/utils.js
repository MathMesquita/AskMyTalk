// @flow

export function toParams(query: string): Object {
  const q: string = query.replace(/^\??\//, '');

  return q.split('&').reduce((values, param) => {
    const [ key, value ] = param.split('=');

    values[key] = value;

    return values;
  }, {});
}

export function toQuery(params: Object, delimiter: string = '&'): string {
  const keys: string[] = Object.keys(params);

  return keys.reduce((str: string, key: string, index: number) => {
    let query = `${str}${key}=${params[key]}`;

    if (index < keys.length - 1) {
      query += delimiter;
    }

    return query;
  }, '');
}
