import { NextPage } from 'next';
import { layoutsMap } from '../layouts';

export type LayoutPage<T = {}> = NextPage<T> & {
  layout: keyof typeof layoutsMap;
};
