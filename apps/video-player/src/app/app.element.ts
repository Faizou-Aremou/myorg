import style from '!!raw-loader!sass-loader!./app.element.scss';
import {
  createBindedProperties,
  createStyleElementFormImportedStyle,
  WebComponentElement,
} from '@web-times-team/util-web-component';
import template from 'raw-loader!./app.element.html';

const styleElement = createStyleElementFormImportedStyle(style);

export class AppElement extends WebComponentElement {
  // AppElement is "host"
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'video-player';
    this.attachComponentTemplateToHost(
      template,
      createBindedProperties([['${title}', title]]),
      styleElement
    );
  }
}
customElements.define('video-player-root', AppElement);

export type BindedProperties = [string, unknown][];
