import { head, isEmpty, tail } from 'ramda';

export class WebComponentElement extends HTMLElement {
  protected attachComponentTemplateToHost(
    template: string,
    properties: BindedProperties,
    styleElement: HTMLStyleElement
  ): void {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const bindedTemplate = this.bindingHostPropertiesToComponentVariables(
      properties,
      template
    );
    shadowRoot.innerHTML = bindedTemplate;
    shadowRoot.appendChild(styleElement);
  }

  private bindingHostPropertiesToComponentVariables(
    properties: BindedProperties,
    template: string
  ): string {
    return replacePropertiesValuesInTemplate(template, properties);
  }
}

export function createStyleElementFormImportedStyle(
  style: string
): HTMLStyleElement {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = style;
  return styleElement;
}

export function replacePropertiesValuesInTemplate(
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

export type BindedProperties = [string, unknown][] & {
  __brand: 'BindedProperties';
};

export function createBindedProperties(
  bindedProperties: [string, unknown][]
): BindedProperties {
  return bindedProperties as BindedProperties;
}

export function defineCustomElement<T extends CustomElementConstructor>(
  name: string,
  customClass: T,
  extendedElement?: string
): void {
  try {
    if (extendedElement) {
      customElements.define(`wtt-${name}`, customClass);
    } else {
      customElements.define(`wtt-${name}`, customClass, { extends: extendedElement });
    }
  } catch (error) {
    throw new Error('defineCustomElement Error');
  }
}
