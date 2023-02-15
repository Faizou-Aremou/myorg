import style from '!!raw-loader!sass-loader!./app.element.scss';
import { isEmpty, head, tail } from 'ramda';
import template from 'raw-loader!./app.element.html';

const styleElement = document.createElement('style');
styleElement.innerHTML = style;

export class AppElement extends HTMLElement {
  // AppElement is "host"
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'video-player';
    this.attachComponentTemplateToHost(
      template,
      this.createBindedProperties([['${title}', title]])
    );
  }

  attachComponentTemplateToHost(
    template: string,
    properties: BindedProperties
  ): void {
    this.attachShadow({ mode: 'open' });
    const bindedTemplate = this.bindingHostPropertiesToComponentVariables(
      properties,
      template
    );
    this.shadowRoot.innerHTML = bindedTemplate;
    this.addStyleToShadowRoot(styleElement);
  }
  addStyleToShadowRoot(styleElement: HTMLStyleElement): void {
    this.shadowRoot.appendChild(styleElement);
  }
  createBindedProperties(
    bindedProperties: [string, unknown][]
  ): BindedProperties {
    return bindedProperties as BindedProperties;
  }
  private bindingHostPropertiesToComponentVariables(
    properties: BindedProperties,
    template: string
  ): string {
    return replacePropertiesValuesInTemplate(template, properties);
  }
}
customElements.define('myorg-root', AppElement);

export type BindedProperties = [string, unknown][];
function replacePropertiesValuesInTemplate(
  template: string,
  properties: [string, unknown][]
): string {
  if (isEmpty(properties)) {
    return template;
  }
  const headElement = head(properties);
  return replacePropertiesValuesInTemplate(
    template.replace(headElement[0], `${headElement[1]}`),
    tail(properties)
  );
}
