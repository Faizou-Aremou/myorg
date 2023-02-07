import { Sequence } from '@web-times-team/util-sequence';
import { RoundedFigure } from './rounded-canvas-object';
import { SquareEdgeFigure } from './square-figure.entity';

export type Figure = RoundedFigure | SquareEdgeFigure;
export type Figures = Sequence<Figure>;
