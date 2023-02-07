import { Incisor } from './incisor.entity';

export type Teeth = {
  readonly rightIncisor: RightIncisor;
  readonly leftIncisor: LeftIncisor;
};

export type RightIncisor = Incisor;
export type LeftIncisor = Incisor;
