import {
  createStyleElementFormImportedStyle,
  WebComponentElement,
} from '@web-times-team/util-web-components';
// import './app.element.scss';
import template from 'raw-loader!./app.element.html';
import style from '!!raw-loader!sass-loader!./app.element.scss';
const styleElement = createStyleElementFormImportedStyle(style);
const DEVICE_ORIENTATION_SUPPORT_ERROR_MSG =
  'Device orientation not supported on your device or browser.  Sorry.';
export class AppElement extends WebComponentElement {
  public static observedAttributes = [];
  connectedCallback() {
    this.attachComponentTemplateToHost(template, styleElement);
  }
}
customElements.define('app-root', AppElement);
if (window.DeviceOrientationEvent) {
  window.addEventListener(
    'deviceorientation',
    (eventData) => {
      const gammaAngle = eventData.gamma;
      const betaAngle = eventData.beta;
      const alphaAngle = eventData.alpha;
      deviceOrientationHandler(gammaAngle, betaAngle, alphaAngle);
    },
    false
  );
} else {
  alert(DEVICE_ORIENTATION_SUPPORT_ERROR_MSG);
}
const myorgRoot: AppElement = document.querySelector('myorg-root');

function deviceOrientationHandler(
  gammaAngle: number,
  betaAngle: number,
  alphaAngle: number
) {
  myorgRoot.shadowRoot.querySelector('.gamma-angle').innerHTML = 'gamma : ' + Math.round(gammaAngle);
  myorgRoot.shadowRoot.querySelector('.beta-angle').innerHTML = 'beta : ' + Math.round(betaAngle);
  myorgRoot.shadowRoot.querySelector('.alpha-angle').innerHTML = 'alpha : ' + Math.round(alphaAngle);
}
