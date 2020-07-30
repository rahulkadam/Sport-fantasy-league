import {Get} from 'API';

export const obj = Object.freeze({
  randomAPI:
    'https://www.random.org/integers/?num=1&min=1&max=99&col=1&base=10&format=plain&rnd=new',
});

export function fetchRandomNumberAPI() {
  return Get(obj.randomAPI).then(
    data => {
      return data;
    },
    error => {
      throw error;
    }
  );
}
