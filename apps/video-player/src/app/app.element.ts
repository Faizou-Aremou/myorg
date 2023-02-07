import style from '!!raw-loader!sass-loader!./app.element.scss';
import template from 'raw-loader!./app.element.html';

const styleElement = document.createElement('style');
styleElement.innerHTML =  style;

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'video-player';
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = template.replace('${title}', title);
    this.shadowRoot.appendChild(styleElement);
  }
}
customElements.define('myorg-root', AppElement);
