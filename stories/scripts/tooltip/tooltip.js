export class SGTooltip {
    tooltipContainer;
    settings = {
        tooltipContent: '',
        tooltipProps: '',
        tooltipPosition: ''
    };

    constructor(container, settings) {
        this.tooltipContainer = container;
        this.settings = {...settings};
        this.init();
    }

    init() {
        this.addListeners();
    }

    addListeners() {
        // Add event listener for mouse enter
        this.addMouseEnterListener();

        // Add event listener for mouse leave
        this.addMouseLeaveListener();
    }

    show() {
        // Create tooltip
        this.createAndPasteTooltipTemplate();
    }

    hide() {
        // Remove tooltip HTML
        this.tooltipContainer.querySelector('.sg-tooltip__wrap').remove();
    }

    // Listen mouse enter on the tooltip container
    addMouseEnterListener() {
        this.tooltipContainer.addEventListener('mouseenter', () => this.show());
    }

    // Listen mouse leave on the tooltip container
    addMouseLeaveListener() {
        this.tooltipContainer.addEventListener('mouseleave', () => this.hide());
    }

    // Create and paste tooltip HTML
    createAndPasteTooltipTemplate() {
        // Create HTML
        const tooltipTemplate = `
            <div class='sg-tooltip__wrap ${this.settings.tooltipProps}'>
                <div class="sg-tooltip__container">${this.settings.tooltipContent}</div>
                <span class="sg-tooltip__arrow"></span>
            </div>
        `;

        // Append HTML to right conatiner
        if (this.settings.tooltipPosition) {
            const tooltipPositionElement = this.tooltipContainer.querySelector(this.settings.tooltipPosition);
            tooltipPositionElement.insertAdjacentHTML('beforeend', tooltipTemplate);
            tooltipPositionElement.classList.add('sg-tooltip__position')
        } else {
            this.tooltipContainer.insertAdjacentHTML('beforeend', tooltipTemplate);
        }
    }
}
