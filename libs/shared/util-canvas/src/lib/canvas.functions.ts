import {
  createFont,
  createFontStyle,
  createWidth,
} from '@web-times-team/util-ui';
import {
    ClearCanvas,
  DefaultWriteMessage,
  GetContext2D,
  WriteBreakLineText,
  WriteStrokedMessage,
} from './canvas.functions.types';

export const defaultWriteMessage: DefaultWriteMessage = (
  context2D,
  message,
  textAlign,
  fillStyle = createFontStyle('black'),
  maxWidth,
  font = createFont('12pt Calibri')
) => {
  context2D.save();
  context2D.font = font;
  context2D.fillStyle = fillStyle;
  if (textAlign) {
    context2D.textAlign = textAlign;
  }
  if (!maxWidth) {
    context2D.fillText(message, 0, 0);
  } else {
    context2D.fillText(message, 0, 0, maxWidth);
  }
  context2D.restore();
};
export const writeStrokedMessage: WriteStrokedMessage = (
  context2D,
  message,
  textAlign,
  fillStyle = createFontStyle('black'),
  strokeStyle,
  lineWidth = createWidth(0.2),
  font = createFont('12pt Calibri'),
  maxWidth
) => {
  context2D.save();
  context2D.font = font;
  context2D.lineWidth = lineWidth;
  context2D.fillStyle = fillStyle;
  context2D.strokeStyle = strokeStyle;
  if (textAlign) {
    context2D.textAlign = textAlign;
  }
  if (!maxWidth) {
    context2D.fillText(message, 0, 0);
    context2D.strokeText(message, 0, 0);
  } else {
    context2D.fillText(message, 0, 0, maxWidth);
    context2D.strokeText(message, 0, 0, maxWidth);
  }
  context2D.restore();
};

export const writeBreakLineText: WriteBreakLineText = (
  context2D,
  message,
  maxWordWidth,
  lineHeight,
  fillStyle,
  strokeStyle,
  lineWidth,
  font = createFont('12pt Calibri')
) => {
  const words = message.split(' ');
  context2D.lineWidth = lineWidth;
  context2D.font = font;
  context2D.fillStyle = fillStyle;
  context2D.strokeStyle = strokeStyle;
  let currentLine = '';
  let breakedMessageClientY = 0;
  words.forEach((word) => {
    const testLine = currentLine + word + ' ';
    const testWidth = context2D.measureText(testLine).width;
    if (testWidth > maxWordWidth) {
      context2D.save();
      context2D.translate(0, breakedMessageClientY);
      context2D.fillText(currentLine, 0, 0);
      context2D.strokeText(currentLine, 0, 0);
      context2D.restore();
      currentLine = word + ' ';
      breakedMessageClientY += lineHeight;
    } else {
      currentLine = testLine;
    }
  });
  context2D.translate(0, breakedMessageClientY);
  context2D.fillText(currentLine, 0, 0);
  context2D.strokeText(currentLine, 0, 0);
  context2D.restore();
};

export const clearCanvas:ClearCanvas = (contest2D)=> {
  contest2D.clearRect(0, 0, contest2D.canvas.width, contest2D.canvas.height);
}
export const getContext2D:GetContext2D = (canvas)=> {
  return canvas.getContext("2d");
}
