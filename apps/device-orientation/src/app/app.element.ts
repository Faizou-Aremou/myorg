import {
  createStyleElementFormImportedStyle,
  WebComponentElement,
} from '@web-times-team/util-web-components';
// import './app.element.scss';
import template from 'raw-loader!./app.element.html';
import style from '!!raw-loader!sass-loader!./app.element.scss';
import * as facade from './facade';
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
const myorgRoot: AppElement = document.querySelector('app-root');

function deviceOrientationHandler(
  gammaAngle: number,
  betaAngle: number,
  alphaAngle: number
) {
  (
    myorgRoot.shadowRoot.querySelector('.logo') as HTMLImageElement
  ).style.transform =
    'rotate(' + alphaAngle + 'deg) rotate3d(1,0,0, ' + betaAngle * -1 + 'deg)';
  myorgRoot.shadowRoot.querySelector('.gamma-angle').innerHTML =
    'gamma : ' + Math.round(gammaAngle);
  myorgRoot.shadowRoot.querySelector('.beta-angle').innerHTML =
    'beta : ' + Math.round(betaAngle);
  myorgRoot.shadowRoot.querySelector('.alpha-angle').innerHTML =
    'alpha : ' + Math.round(alphaAngle);
}

let response;
try {
  response = await facade.fetchTest();
  const responseDiv = document.createElement('div');
  responseDiv.innerHTML = response.message;
  myorgRoot.shadowRoot.append(responseDiv);
} catch (error) {
  console.error(error);
}
