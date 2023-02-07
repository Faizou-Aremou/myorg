import { createDistance } from './domain-objects/distance';
import {
  createClientX,
  createClientY,
} from './domain-objects/position.value-object';
import { RoundedFigure } from './domain-objects/rounded-canvas-object';
import { SquareEdgeFigure } from './domain-objects/square-figure.entity';
import {
  GetClientX,
  GetClientY,
  GetDiagonal,
  GetEyes,
  GetFillColor,
  GetIncisor,
  GetLeftEye,
  GetMouth,
  GetNose,
  GetPosition,
  GetRectangleCenterClientX,
  GetRectangleCenterClientY,
  GetRightEye,
  GetRoundedFigureRadius,
  GetSpeed,
  GetSpeedClientX,
  GetSpeedClientY,
  GetSquareEdgeFigureHeight,
  GetSquareEdgeFigureWidth,
  GetStrokeColor,
  GetTeeth,
} from './figure.functions.type';

export const getSquareEdgeFigureWidth: GetSquareEdgeFigureWidth = (
  figure: SquareEdgeFigure
) => {
  return figure.width;
};

export const getRoundedFigureRadius: GetRoundedFigureRadius = (
  figure: RoundedFigure
) => {
  return figure.radius;
};
export const getSquareEdgeFigureHeight: GetSquareEdgeFigureHeight = (
  figure: SquareEdgeFigure
) => {
  return figure.height;
};

export const getPosition: GetPosition = (figure) => {
  return figure.position;
};
export const getClientX: GetClientX = (position) => {
  return position.clientX;
};
export const getClientY: GetClientY = (position) => {
  return position.clientY;
};
export const getSpeed: GetSpeed = (figure) => {
  return figure.speed;
};

export const getSpeedClientX: GetSpeedClientX = (speed) => {
  return speed.clientX;
};
export const getSpeedClientY: GetSpeedClientY = (speed) => {
  return speed.clientY;
};
export const getFillColor: GetFillColor = (figure) => {
  return figure.fillColor;
};
export const getStrokeColor: GetStrokeColor = (figure) => {
  return figure.strokeColor;
};

export const getRectangleCenterClientX: GetRectangleCenterClientX = (
  rectangle
) => {
  return createClientX(
    getClientX(getPosition(rectangle)) + rectangle.width / 2
  );
};
export const getRectangleCenterYlocation:GetRectangleCenterClientY = (rectangle) => {
  return createClientY(
    getClientY(getPosition(rectangle)) + rectangle.height / 2
  );
};
export const getDiagonal:GetDiagonal = (width, height) => {
  const diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  return createDistance(diagonal);
};

export const getRightEye:GetRightEye = (eyes) => {
  return eyes.right;
};
export const getLeftEye:GetLeftEye = (eyes) => {
  return eyes.left;
};

export const monsterHeadEyes:GetEyes = (monsterHead) => {
  return monsterHead.eyes;
};

export const monsterHeadNose:GetNose = (monsterHead) => {
  return monsterHead.nose;
};
export const monsterHeadMouthTeeth:GetTeeth = (monsterMouth) => {
  return monsterMouth.teeth;
};

export const rightIncisor:GetIncisor = (monsterHeadMouthTeeth) => {
  return monsterHeadMouthTeeth.rightIncisor;
};
export const leftIncisor:GetIncisor = (monsterHeadMouthTeeth) => {
  return monsterHeadMouthTeeth.leftIncisor;
};
export const monsterHeadMouth:GetMouth = (monsterHead) => {
  return monsterHead.mouth;
};
