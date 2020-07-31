export interface Random {
  number: number;
  isLoading: boolean;
  hasError: boolean;
  isFulfilled: boolean;
}

export interface RootState {
  random: Random;
}

export {default as RandomReducer} from './randomReducer';
export {default as useRandomAPI} from './randomHooks';
export {useActions} from './randomActions';
export * from './randomTypes_old';
