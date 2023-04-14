export class SGSlider {
  sliderClassName = 'sg-slider';
  firstSlideNumber = 1;

  rootElementId;

  rootElement;
  slideElements;
  buttonPrevElement;
  buttonNextElement;
  slideWrapperElement;
  sliderTitleElement;

  slidesAmount;
  currentSlideNumber;

  constructor(options) {
    this.rootElementId = options.rootElementId;
  }

  init() {
    this.rootElement = document.getElementById(this.rootElementId);
    if (!this.rootElement) return;

    this.slideWrapperElement = this.rootElement.querySelector(`.${this.sliderClassName}__slide-wrapper`);
    this.sliderTitleElement = this.rootElement.querySelector(`.${this.sliderClassName}__title`);
    this.initButtons();
  }

  start() {
    this.initSlides();
    this.setDefaultState();
    this.setUpSwitchBlock();
  }

  setDefaultState() {
    this.currentSlideNumber = this.firstSlideNumber;
    this.slideWrapperElement.scrollTo({left: 0});
    this.manageButtonsDisability(this.firstSlideNumber);
    this.updateTitle(this.firstSlideNumber);
  }

  initButtons() {
    this.buttonPrevElement = document.querySelector(`#${this.rootElementId}-button-previous`);
    this.buttonNextElement = document.querySelector(`#${this.rootElementId}-button-next`);
    this.addButtonsEventListeners();
  }

  initSlides() {
    this.slideElements = this.rootElement.getElementsByClassName(`${this.sliderClassName}__slide`);
    this.slidesAmount = this.slideElements?.length;
  }

  setUpSwitchBlock() {
    if (this.slidesAmount === 1) {
      this.rootElement.classList.add(`${this.sliderClassName}--hidden-switch-block`);
    } else {
      this.rootElement.classList.remove(`${this.sliderClassName}--hidden-switch-block`);
    }
  }

  addButtonsEventListeners() {
    this.buttonPrevElement.addEventListener('click', () => this.switchToPrevSlide());
    this.buttonNextElement.addEventListener('click', () => this.switchToNextSlide());
  }

  manageButtonsDisability(currentSlideNumber) {
    const isFirstSlide = currentSlideNumber === this.firstSlideNumber;
    const isLastSlide = currentSlideNumber === this.slidesAmount;

    this.buttonPrevElement.disabled = isFirstSlide;
    this.buttonNextElement.disabled = isLastSlide;

    if (!isFirstSlide && !isLastSlide && this.buttonPrevElement.disabled) this.buttonPrevElement.disabled = false;
    if (!isFirstSlide && !isLastSlide && this.buttonNextElement.disabled) this.buttonNextElement.disabled = false;
  }

  switchToPrevSlide() {
    (this.currentSlideNumber > this.firstSlideNumber) && this.switchToSlide(this.currentSlideNumber - 1);
  }

  switchToNextSlide() {
    (this.currentSlideNumber < this.slidesAmount) && this.switchToSlide(this.currentSlideNumber + 1);
  }

  switchToSlide(targetSlideNumber) {
    this.currentSlideNumber = targetSlideNumber;
    this.scrollWrapperElementToSlide(targetSlideNumber);
    this.manageButtonsDisability(targetSlideNumber);
    this.updateTitle(targetSlideNumber);
  }

  scrollWrapperElementToSlide(targetSlideNumber) {
    const slideIndexInArray = targetSlideNumber - 1;
    const sLideElementStartsAtPx = slideIndexInArray * this.slideWrapperElement.offsetWidth;

    this.slideWrapperElement.scrollTo({left: sLideElementStartsAtPx, behavior: 'smooth'});
  }

  updateTitle(targetSlideNumber) {
    this.sliderTitleElement.innerText = `${targetSlideNumber} of ${this.slidesAmount}`;
  }
}
