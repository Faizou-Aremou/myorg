import { Font, FontStyle, Height, Message, Width } from '@web-times-team/util-ui';

export type DefaultWriteMessage = (
  context2D: CanvasRenderingContext2D,
  message: Message,
  textAlign: CanvasTextAlign,
  fillStyle: FontStyle,
  maxWidth: Width,
  font: Font
) => void;
export type WriteStrokedMessage= (
  context2D: CanvasRenderingContext2D,
  message:Message,
  textAlign:CanvasTextAlign,
  fillStyle:FontStyle,
  strokeStyle: FontStyle,
  lineWidth:Width,
  font:Font,
  maxWidth:Width,
)  => void;

export type WriteBreakLineText = (
  context2D:CanvasRenderingContext2D,
  message:Message,
  maxWordWidth:Width,
  lineHeight:Height,
  fillStyle:FontStyle,
  strokeStyle:FontStyle,
  lineWidth:Width,
  font:Font
) => void;
export type ClearCanvas = (contest2D:CanvasRenderingContext2D) => void;
export type GetContext2D = (canvas:HTMLCanvasElement) => CanvasRenderingContext2D