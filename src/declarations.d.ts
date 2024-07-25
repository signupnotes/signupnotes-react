declare namespace JSX {
  interface IntrinsicElements {
    'form-element': { formId?: string; ref: React.RefObject<HTMLElement | null> };
  }
}
