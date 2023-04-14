import { SGDropdown } from './dropdown';
import { TEXT_ITEM } from '../../configs';


export class SGGeneratedDropdown extends SGDropdown {

  preselectedValue;

  listItemData;
  listItemType;

  constructor(options) {
    super(options);
    this.listItemData = options.listItemData;
    this.listItemType = options.listItemType;
    this.preselectedValue = options.value;
    this.initGeneratedDropdown();
  };

  initGeneratedDropdown() {
    this.createListItemElements(this.listItemData);

    if (this.preselectedValue) {
      this.value = this.preselectedValue;
      this.preselectedValue = null;
    }
  };

  createListItemElements(listItemData) {
    if (!listItemData) return;

    const listElement = document.querySelector(`#${this.id} .${this.dropdownClassName}-list`);
    if (!listElement) return;

    listItemData.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add(`${this.dropdownClassName}-list-item`);
      listElement.append(itemElement);

      const inputElement = document.createElement('input');
      inputElement.classList.add(
        `${this.dropdownClassName}-list-item__input`,
        `${this.dropdownClassName}-list-item__input--${this.listItemType}`
      );
      inputElement.setAttribute('type', (this.listItemType === TEXT_ITEM) ? 'radio' : this.listItemType);
      inputElement.setAttribute('title', item.title);
      inputElement.setAttribute('id', `${item.name}-${item.value}`);
      inputElement.setAttribute('name', item.name);
      inputElement.setAttribute('value', item.value);
      inputElement.setAttribute('data-list-item-type', this.listItemType);
      inputElement.setAttribute('data-object', item.dataObject);
      inputElement.setAttribute('data-slug', item.dataSlug);
      inputElement.setAttribute('data-value', item.dataValue);
      itemElement.append(inputElement);

      const labelElement = document.createElement('label');
      labelElement.classList.add(`${this.dropdownClassName}-list-item__text-wrapper`);
      labelElement.setAttribute('for', `${item.name}-${item.value}`);
      itemElement.append(labelElement);

      const titleElement = document.createElement('span');
      titleElement.classList.add(`${this.dropdownClassName}-list-item__title`);
      titleElement.textContent = item.title;
      labelElement.append(titleElement);

      if (this.valueIsTruthy(item.textInBraces)) {
        const textInBracesElement = document.createElement('span');
        textInBracesElement.classList.add(`${this.dropdownClassName}-list-item__text-in-braces`);
        textInBracesElement.textContent = ` (${item.textInBraces})`;
        labelElement.setAttribute('data-count', item.textInBraces);
        titleElement.append(textInBracesElement);
      } else if (item.textInBraces === 0) {
        labelElement.setAttribute('data-count', item.textInBraces);
      }

      this.listItemElements = Array.from(this.dropdownElement?.querySelectorAll(`.${this.dropdownClassName}-list-item`));
    })
  };

  rerenderList(listItemData) {
    this.listItemData = listItemData;
    document.querySelector(`#${this.id} .${this.dropdownClassName}-list`).innerHTML = '';
    this.createListItemElements(this.listItemData);
    this.addOnClickListItemListener();
  }
}
