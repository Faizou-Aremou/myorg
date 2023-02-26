export class WebComponentElement extends HTMLElement {
  protected template = '';
  protected attachComponentTemplateToHost(
    template: string,
    styleElement?: HTMLStyleElement,
  ): void {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
    styleElement ? shadowRoot.appendChild(styleElement) : undefined;
  }
}

export function createStyleElementFormImportedStyle(
  style: string
): HTMLStyleElement {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = style;
  return styleElement;
}

// export function replacePropertiesValuesInTemplate(
//   template: string,
//   bindeProperties: BindedProperties
// ): string {
//   if (isEmpty(bindeProperties)) {
//     return template;
//   }
//   const headElement = head(bindeProperties) as [string, unknown];
//   return replacePropertiesValuesInTemplate(
//     template.replace(headElement[0], `${headElement[1]}`),
//     createBindedProperties(tail(bindeProperties))
//   );
// }


export function defineCustomElement<T extends CustomElementConstructor>(
  name: string,
  customClass: T,
  extendedElement?: string
): void {
  try {
    if (extendedElement) {
      customElements.define(`wtt-${name}`, customClass);
    } else {
      customElements.define(`wtt-${name}`, customClass, {
        extends: extendedElement,
      });
    }
  } catch (error) {
    throw new Error('defineCustomElement Error');
  }
}
