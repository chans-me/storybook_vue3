export class SGModal {
    id;
    settings = {
        closeModalCallback: null
    }

    modalElement;
    closeButtonElement;
    backdropElement;

    isOpen;

    constructor(modalElementId, settings) {
        this.id = modalElementId;
        this.settings = {...settings};
        this.modalElement = document.getElementById(modalElementId);
        this.closeButtonElement = this.modalElement?.querySelector('.sg-modal__close-button');
        this.backdropElement = this.modalElement?.querySelector('.sg-modal__backdrop');
    }

    open() {
        this.modalElement.classList.add('sg-modal--open');
        document.body.classList.add('sg-modal__body--modal-enabled');
        this.isOpen = true;
        this.addClosingListeners();
    }

    close() {
        this.modalElement.classList.remove('sg-modal--open');
        document.body.classList.remove('sg-modal__body--modal-enabled');
        this.isOpen = false;
        this.clearClosingListeners();

        if(typeof this.settings.closeModalCallback === 'function') {
            this.settings.closeModalCallback();
        }
    }

    addClosingListeners() {
        this.closeButtonElement.addEventListener('click', this.close.bind(this));
        this.backdropElement.addEventListener('click', this.close.bind(this));
        document.addEventListener('keyup', this.onClickEscape.bind(this));
    }

    clearClosingListeners() {
        this.closeButtonElement.removeEventListener('click', this.close.bind(this));
        this.backdropElement.removeEventListener('click', this.close.bind(this));
        document.removeEventListener('keyup', this.onClickEscape.bind(this));
    }

    onClickEscape(event) {
        if (event.code === 'Escape') {
            this.close();
        }
    }

    togglePreloader(booleanValue) {
        booleanValue ?
            this.modalElement.classList.add('sg-modal--preloader') :
            this.modalElement.classList.remove('sg-modal--preloader');
    }
}
