import {
  Color,
  GetHeight,
  GetWidth,
  Height,
  Width,
} from '@web-times-team/util-ui';
import { Distance } from './domain-objects/distance';
import { Eyes, LeftEye, RightEye } from './domain-objects/eyes.entity';
import { Figure } from './domain-objects/figure.entity';
import { FillColor } from './domain-objects/fill-color';
import { Head } from './domain-objects/head.entity';
import { Incisor } from './domain-objects/incisor.entity';
import { MonsterHead } from './domain-objects/monster-head.entity';
import { Mouth } from './domain-objects/mouth.entity';
import { MovableCanvasObject } from './domain-objects/movable-canvas-object.entity';
import { Nose } from './domain-objects/nose.entity';
import {
  ClientX,
  ClientY,
  Position,
} from './domain-objects/position.value-object';
import { Radians } from './domain-objects/radians';
import { Radius } from './domain-objects/radius';
import { Rectangle } from './domain-objects/rectangle.entity';
import { RoundedFigure } from './domain-objects/rounded-canvas-object';
import { RoundedRectangle } from './domain-objects/rounded-rectangle.entity';
import { Speed } from './domain-objects/speed.value-object';
import { StrokeColor } from './domain-objects/stroke-color';
import { Teeth } from './domain-objects/teeth.entity';

export type GetSquareEdgeFigureWidth = GetWidth;
export type GetRoundedFigureRadius = (figure: RoundedFigure) => Radius;
export type GetSquareEdgeFigureHeight = GetHeight;

export type GetPosition = (figure: Figure) => Position;
export type GetClientX = (position: Position) => ClientX;
export type GetClientY = (position: Position) => ClientY;
export type GetSpeed = (canvasObject: MovableCanvasObject) => Speed;

export type GetSpeedClientX = (speed: Speed) => ClientX;
export type GetSpeedClientY = (speed: Speed) => ClientY;

export type GetFillColor = (figure: Figure) => FillColor;
export type GetStrokeColor = (figure: Figure) => StrokeColor;
export type GetRectVertOrHorzBorderCollDistFromLoc = (figure: Figure) => 0;

export type GetFigVertRightCollDistFromLoc =
  | GetSquareEdgeFigureWidth
  | GetRoundedFigureRadius;
export type GetFigVertLeftOrHorzTopColMarginDistFromLoc =
  | GetRectVertOrHorzBorderCollDistFromLoc
  | GetRoundedFigureRadius;
export type GetFigureVerticalCollisionDistanceFromLocation =
  | GetFigVertRightCollDistFromLoc
  | GetFigVertLeftOrHorzTopColMarginDistFromLoc;

export type GetFigureHorizontalBottomCollisionDistanceFromLocation =
  | GetSquareEdgeFigureHeight
  | GetRoundedFigureRadius;

export type GetFigureHorizontalCollisionMarginDistanceFromLocation =
  | GetFigureHorizontalBottomCollisionDistanceFromLocation
  | GetFigVertLeftOrHorzTopColMarginDistFromLoc;

export type GetRectangleCenterClientX = (rectangle: Rectangle) => ClientX;
export type GetRectangleCenterClientY = (rectangle: Rectangle) => ClientY;
export type GetDiagonal = (width: Width, height: Height) => Distance;

export type GetRightEye = (eyes: Eyes) => RightEye;
export type GetLeftEye = (eyes: Eyes) => LeftEye;

export type GetEyes = (head: Head) => Eyes;

export type GetNose = (head: Head) => Nose;
export type GetTeeth = (mouth: Mouth) => Teeth;

export type GetIncisor = (teeth: Teeth) => Incisor;
export type GetMouth = (head: Head) => Mouth;

/* draw functions */
export type DrawSquareRectangle = (
  context2D: CanvasRenderingContext2D,
  originClientX: ClientX,
  originClientY: ClientY,
  rectangle: Rectangle
) => undefined;

export type DrawRoundedRectangle = (
  context2D: CanvasRenderingContext2D,
  originClientX: ClientX,
  originClientY: ClientY,
  roundedRectangle: RoundedRectangle
) => undefined;

export type DrawTopAndTopRightCorner = (
  context2D: CanvasRenderingContext2D,
  roundedRectangle: RoundedRectangle
) => undefined;
export type DrawRightSideAndBottomRightCorner = (
  context2D: CanvasRenderingContext2D,
  roundedRectangle: RoundedRectangle
) => undefined;

export type DrawBottomAndBottomLeftCorner = (
  context2D: CanvasRenderingContext2D,
  roundedRectangle: RoundedRectangle
) => undefined;

export type DrawLeftAndTopLeftCorner = (
  context2D: CanvasRenderingContext2D,
  roundedRectangle: RoundedRectangle
) => undefined;
export type DrawMonsterTurnOfHead = (
  context2D: CanvasRenderingContext2D,
  originClientX: ClientX,
  originClientY: ClientY,
  monsterHead: MonsterHead
) => undefined;
export type DrawMonsterHead = (
  originClientX: ClientX,
  originClientY: ClientY,
  monsterHead: MonsterHead,
  context2D: CanvasRenderingContext2D,
  drawMonsterTurnOfHead: DrawMonsterTurnOfHead
) => undefined;

export type DrawMonsterHeadEyes = (
  eyes: Eyes,
  context2D: CanvasRenderingContext2D,
  color: Color
) => undefined;

export type DrawMonsterHeadRightEye = (
  eyesWidth: Width,
  eyesheight: Height,
  eyes: Eyes,
  context2D: CanvasRenderingContext2D
) => undefined;
export type DrawMonsterHeadLeftEye = (
  eyesWidth: Width,
  eyesheight: Height,
  eyes: Eyes,
  context2D: CanvasRenderingContext2D
) => undefined;
export type drawFilledRectangleRelativeToHead = (
  width: Width,
  height: Height,
  figure: Figure,
  context2D: CanvasRenderingContext2D
) => undefined;
export type DrawFilledRectangleRelativeToMouth = (
  width: Width,
  height: Height,
  figure: Figure,
  context2D: CanvasRenderingContext2D
) => undefined;
export type DrawStrokedRectangleToHead = (
  width: Width,
  height: Height,
  rectangle: Rectangle,
  context2D: CanvasRenderingContext2D
) => undefined;
export type DrawMonsterHeadNose = (
  nose: Nose,
  context2D: CanvasRenderingContext2D
) => undefined;
export type DrawMonsterHeadMouth = (
  mouth: Mouth,
  context2D: CanvasRenderingContext2D
) => undefined;

export type drawMonsterMouthTeeth = (
  teeth: Teeth,
  context2D: CanvasRenderingContext2D,
  color: Color
) => undefined;

export type DrawMonsterHeadMouthTeethIncisorRight = (
  teeth: Teeth,
  context2D: CanvasRenderingContext2D
) => undefined;
export type DrawMonsterHeadTeethIncisorLeft = (
  teeth: Teeth,
  context2D: CanvasRenderingContext2D
) => undefined;

export type DrawLine = (
  context2D: CanvasRenderingContext2D,
  lineStartClientX: ClientX,
  lineStartClientY: ClientY,
  endPointClientX: ClientX,
  endPointClientY: ClientY,
  color: Color,
  width: Width
) => undefined;
export type DrawArrowHead = (
  context2D: CanvasRenderingContext2D,
  backCorner1ClientX: ClientX,
  backCorner1ClientY: ClientY,
  lineEndClientX: ClientX,
  lineEndClientY: ClientY,
  backCorner2ClientX: ClientX,
  backCorner2ClientY: ClientY
) => undefined;
export type DefaultDrawArrow = (
  context2D: CanvasRenderingContext2D,
  lineStartClientX: ClientX,
  lineStartClientY: ClientY,
  lineEndClientX: ClientX,
  lineEndClientY: ClientY,
  drawArrowHead: DrawArrowHead,
  which,
  arrowAngle,
  length
) => undefined;
export type lineAngle = (clientX, clientY) => Radians;

export type hypothenus = (adjacentSide, angle) => Distance;
