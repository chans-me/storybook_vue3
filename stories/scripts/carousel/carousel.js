import Glide from '@glidejs/glide';
export class SGCarousel {
  containerId;
  containerElement;

  carouselDefaultConfig = {
    type: 'carousel',
    perView: 4,
    gap: 5,
    animationDuration: 200,
    breakpoints : {
      1199: {
        perView: 3
      },
      991: {
        perView: 2
      },
      767: {
        perView: 1
      },
      576: {
        perView: 1,
        peek: 85,
        gap: 0
      }
    }
  };

  constructor(options) {
    this.containerId = options.containerId;
    this.containerElement = document.getElementById(this.containerId);
  }

  init() {
    this.renderDots();
    new Glide(`#${this.containerId}`, this.carouselDefaultConfig).mount();
  }

  renderDots() {
    const slidesCount = this.containerElement.querySelector('.glide__slides').childElementCount;
    let dots = '';
    let i = 0;

    while (i < slidesCount) {
      const currentDot = `<button class="glide__bullet" data-glide-dir="=${i}"></button>`;
      dots += currentDot;
      i++;
    }

    const dotsContainer = `<div class="glide__bullets" data-glide-el="controls[nav]">${dots}</div>`;
    this.containerElement.querySelector('.glide').insertAdjacentHTML('beforeend', dotsContainer);
  }
}

// Function for initiation of all Carousel elements on the page
export function initCarousel() {
  // Find all element with the 'sg-carousel' class
  document.querySelectorAll('.sg-carousel').forEach(carousel => {
    // Get id of every container
    const idOfContainer = carousel.id;

    // Init SGCarousel for every container
    new SGCarousel({containerId: idOfContainer}).init();
  });
}
