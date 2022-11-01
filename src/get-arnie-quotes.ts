import { httpGet } from './mock-http-interface';

type TResult = {'Arnie Quote': string} | {FAILURE: string};
type httpGetResponse = {status: number, body: string}

const parseHttpGetResponse = ({status, body}:httpGetResponse ) => {
  if (status === 200){
    return {'Arnie Quote': JSON.parse(body).message}
  }
  return {'FAILURE': JSON.parse(body).message}
}

export const getArnieQuotes = async (urls : string[]) : Promise<TResult[]> => {
  const result:any = urls.map((url: string) => httpGet(url)
  .then(parseHttpGetResponse))
  return Promise.all(result)
};
