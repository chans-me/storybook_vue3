import { accordionClassName } from '../../configs';


export class SGAccordion {
  constructor() {
    this.init()
  };

  init() {
    this.addListeners();
  };

  addListeners() {
    this.addOnClickTitleListeners()
  };

  // add listeners to all accordions on page
  addOnClickTitleListeners() {
    const accordionTitleElements = Array.from(document.getElementsByClassName(`${accordionClassName}__title-wrapper`));

    accordionTitleElements.forEach(accordionElement => {
      accordionElement.addEventListener('click', () => {
        accordionElement.closest(`.${accordionClassName}`).classList.toggle(`${accordionClassName}--open`);
      })
    })
  };
}

// Function for initiation of all Accordion elements on the page
export function initAccordion() {
  new SGAccordion();
}
