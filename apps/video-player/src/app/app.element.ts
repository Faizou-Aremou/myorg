import style from '!!raw-loader!sass-loader!./app.element.scss';
import {
  createStyleElementFormImportedStyle,
  defineCustomElement,
  WebComponentElement,
} from '@web-times-team/util-web-components';
import template from 'raw-loader!./app.element.html';
//TODO: Add automatically when create file with schematic or other technique
const styleElement = createStyleElementFormImportedStyle(style);

export class AppElement extends WebComponentElement {
  public static observedAttributes = [];
  //TODO: Add automatically when create file with schematic or other technique
  connectedCallback() {
    const title = 'video-player';
    this.attachComponentTemplateToHost(
      template,
      styleElement,
    );
  }
}
//TODO: Add automatically when create file with schematic or other technique
customElements.define('app-root', AppElement);
