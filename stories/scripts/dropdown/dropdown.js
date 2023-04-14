import { dropdownClassName } from '../../configs';


export class SGDropdown {
  id;
  changeButtonText;
  clickListItemCallback;
  focusWhenSelectValue;
  preselectedValue;

  dropdownClassName = dropdownClassName;
  open = false;
  listItemType;

  buttonElement;
  dropdownElement;
  labelElement;
  listItemElements = [];
  buttonTitleElement;

  _value = [];
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;

    this.updateDropdownFocusStyles();

    if (this.changeButtonText) {
      const title = this.getListItemTitleByValue(value[0]);
      this.updateButtonText(title);
    }

    // For cases when value was set with JS like 'dropdown.value = [100]'
    this.checkInputElements();
    this.updateSelectedFilterText();
  }

  _expandable;
  get expandable() {
    return this._expandable;
  }
  set expandable(value) {
    this._expandable = value;

    if (!this.dropdownElement) return;
    value ?
        this.dropdownElement.classList.add('sg-dropdown--expandable') :
        this.dropdownElement.classList.remove('sg-dropdown--expandable') ;
    this.updateSelectedFilterText();
  }

  constructor(options) {
    this.id = options.id;
    this.changeButtonText = options.changeButtonText;
    this.clickListItemCallback = options.clickListItemCallback;
    this.focusWhenSelectValue = options.focusWhenSelectValue;
    this.preselectedValue = options.value;
    this.expandable = options.expandable;
    this.init();
  };

  init() {
    this.defineElements();
    if (!this.dropdownElement) return;

    this.addButtonListeners();

    if (this.preselectedValue) {
      this.value = this.preselectedValue;
      this.preselectedValue = null;
    }
  };

  collectValuesFromListItemElements() {
    const resultValue = [];
    this.listItemElements.forEach(item => {
      const input = item.querySelector(`.${this.dropdownClassName}-list-item__input`);
      input.checked && resultValue.push(input.value);
    });
    return resultValue;
  }

  defineElements() {
    this.dropdownElement = document.getElementById(this.id);

    if (!this.dropdownElement) return;

    this.buttonElement = document.getElementById(`${this.id}-button`);
    this.labelElement = document.querySelector(`#${this.id} .sg-label`);
    this.buttonTitleElement = this.buttonElement.querySelector(`.${this.dropdownClassName}__button-title`);

    this.listItemElements = Array.from(this.dropdownElement?.querySelectorAll(`.${this.dropdownClassName}-list-item`));
    if (!this.listItemElements.length) return;

    if (!this.listItemType) {
      this.listItemType = this.listItemElements[0].querySelector(`.${this.dropdownClassName}-list-item__input`).type;
    }
  };

  addButtonListeners() {
    if (!this.buttonElement) return;

    this.buttonElement.addEventListener('click', (event) => {
      event.preventDefault();
      this.open ? this.closeDropdown() : this.openDropdown();
    });

    this.buttonElement.addEventListener('click', (event) => {
      event.preventDefault();

      this.addOnClickOutsideDropdownListener();
      this.addOnClickListItemListener();
    }, {once: true});
  };

  addOnClickOutsideDropdownListener() {
    if (!this.dropdownElement || this.expandable) return;

    document.addEventListener('click', (event) => {
      if (!this.open) return;

      if (!event.target.closest(`#${this.id}`)) {
        this.closeDropdown();
      }
    })
  };

  addOnClickListItemListener() {
    if (!this.dropdownElement) return;

    this.listItemElements.forEach(listItem => {
      listItem.addEventListener('click', (event) => {
        const listItem = event.target.closest(`.${this.dropdownClassName}-list-item__input`);

        if (listItem) {
          this.onClickListItemAction(listItem);
        }
      })
    });
  };

  updateButtonText(text) {
    this.buttonTitleElement.innerText = text;
    this.open && this.closeDropdown();
  }

  checkInputElements() {
    if (!this.dropdownElement) return;

    const inputs = this.dropdownElement.querySelectorAll(`.${this.dropdownClassName}-list-item__input`);

    Array.from(inputs).forEach(input => {
      if (isNaN(parseInt(input.value))) {
        input.checked = this.value.includes(input.value);
      } else {
        input.checked = (this.value.includes(parseInt(input.value)) || this.value.includes(input.value));
      }
    })
  }

  onClickListItemAction(inputElement) {
    if (this.changeButtonText) {
      this.updateButtonText(inputElement.title);
    }

    this.value = this.collectValuesFromListItemElements();
    this.clickListItemCallback && this.clickListItemCallback(inputElement);
  }

  updateDropdownFocusStyles() {
    if (!this.focusWhenSelectValue) return;

    if ((this.valueIsTruthy(this.value[0])) || (this.value.length > 1)) {
      this.dropdownElement.classList.add(`${this.dropdownClassName}--focus`)

    } else {
      this.dropdownElement.classList.remove(`${this.dropdownClassName}--focus`);
    }

    if (this.value.length === 0) {
      this.dropdownElement.classList.remove(`${this.dropdownClassName}--focus`);
    }
  }

  updateSelectedFilterText() {
    if (!this.dropdownElement) return;

    const filterTitleElement = this.dropdownElement.querySelector('.sg-dropdown__caption');
    if (!filterTitleElement) return;

    if (this.expandable) {
      const resultSpans = [];
      this.value.forEach(value => {
        if (!this.valueIsTruthy(value)) return;

        const title = this.getListItemTitleByValue(value);
        resultSpans.push(`<span class="sg-dropdown__caption-text">${title}</span>`);
      });
      filterTitleElement.innerHTML = resultSpans.join('');
    } else {
      filterTitleElement.innerHTML = '';
    }
  }

  openDropdown() {
    this.dropdownElement.classList.add(`${this.dropdownClassName}--open`);
    this.open = true;
  };

  closeDropdown() {
    this.dropdownElement.classList.remove(`${this.dropdownClassName}--open`);
    this.open = false;
  };

  clear() {
    this.value = [];
  }

  valueIsTruthy(value) {
    return Boolean(value) && (value !== '0');
  }

  getListItemTitleByValue(value) {
    let title;
    this.listItemElements.forEach(item => {
      const input = item.querySelector(`.${this.dropdownClassName}-list-item__input`);

      if (input.value.toString() === value.toString()) {
        title = input.title;
      }
    })
    return title;
  }
}
