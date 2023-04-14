import { RADIO, TEXT } from './strings';

// Classnames

export const accordionClassName = 'sg-accordion';
export const dropdownClassName = 'sg-dropdown';
export const paginationClassName = 'sg-pagination';
export const secondaryTitleClassName = 'sg-secondary-title';
export const iconClassName = 'sg-icon';
export const heroSectionClassName = 'sg-hero-section';
export const containerClassName = 'sg-container';
export const infoCardClassName = 'sg-info-card';
export const awardCardClassName = 'sg-award-card';
export const avatarClassName = 'sg-avatar';
export const userClassName = 'sg-user';
export const quoteCardClassName = 'sg-quote-card';
export const carouselClassName = 'sg-carousel';
export const gridClassName = 'sg-grid';
export const wellClassName = 'sg-well';
export const blockquoteClassName = 'sg-blockquote';
export const linkClassName = 'sg-link';
export const listClassName = 'sg-list';
export const tableClassName = 'sg-table';
export const scrollClassName = 'sg-scroll';
export const scrollbarClassName = 'sg-scrollbar';
export const tableOfContentClassName = 'sg-table-of-content';
export const costSectionClassName = 'sg-cost-section';
export const costGraphClassName = 'sg-cost-graph';
export const relatedDirectoriesSectionClassName = 'sg-related-directories-section';
export const breadcrumbsClassName = 'sg-breadcrumbs';

// Ids

export const accordionElementId = 'exampleAccordion';
export const sliderElementId = 'exampleSlider';


// Default storybook configs

export const accordionDefaultArgs = {
  title: 'Portfolio & Awards'
};

export const chipDefaultConfigs = {
  title: 'Website Design'
};

export const dropdownDefaultConfigs = {
  changeButtonText: false,
  dropdownTitle: 'Dropdown',
  dropdownId: 'exampleDropdown',
  itemType: RADIO,
  focusWhenSelectValue: true,
  expandable: false,
  label: 'Label'
};

export const dropdownListItemDefaultConfigs = {
  name: 'name',
  title: 'Some title',
  textInBraces: '309',
  type: RADIO,
  value: 'value'
};

export const inputFieldDefaultConfigs = {
  id: 'exampleInputField',
  placeholder: 'Search...',
  type: 'search'
};

export const labelDefaultConfigs = {
  title: 'Sort by',
  forAttribute: dropdownDefaultConfigs.dropdownId
};

export const secondaryTitleDefaultConfigs = {
  icon: 'none',
  title: 'Portfolio & Awards',
  type: TEXT
};

export const sliderDefaultConfigs = {
  id: sliderElementId
};

export const iconDefaultConfigs = {
  iconName: 'arrow',
  iconWidth: '20px',
  iconHeight: '20px',
  iconColor: '#08537e'
};

export const iconOptions = [
  'arrow',
  'arrow-pagination',
  'arrow-slider',
  'arrow-thick',
  'building',
  'calendar',
  'calendar-table',
  'checked',
  'check',
  'clock',
  'clutch-brand-colors',
  'clutch-minimalistic',
  'clutch-one-color',
  'contact',
  'contact-oval',
  'copy',
  'default-provider-logo',
  'display',
  'edit',
  'email',
  'exit',
  'facebook',
  'flag',
  'folded-flag',
  'globe',
  'input-search',
  'instagram',
  'language',
  'letter',
  'linkedin',
  'map',
  'person',
  'phone',
  'phone-hollow',
  'pin',
  'presentation',
  'search-with-dots',
  'share',
  'sponsor',
  'tag',
  'twitter',
  'verification'
];

export const infoCardDefaultConfigs = {
  accentColor: '#119027',
  backgroundColor: 'rgba(17, 144, 39, 0.05)'
};


export const quoteCardDefaultConfigs = {
  accentColor: '#267C87',
  backgroundColor: 'rgba(38, 124, 135, 0.05)'
};

export const avatarDefaultConfigs = {
  size: '65px',
  shape: 'square',
};

export const userDefaultConfigs = {
  avatarSize: '65px',
  avatarShape: 'hexagon'
};

export const carouselDefaultConfigs = {
  id: 'carousel-example',
};

export const gridDefaultConfigs = {
  elementsNumber: 1,
  columnNumber: 1,
  rowNumber: 1,
  columnGap: '20px',
  rowGap: '20px',
  autoWidth: false
};

export const wellDefaultConfigs = {
  text: 'Lorem ipsum dolor sit amet consectetur. Pretium egestas eget purus nibh enim quis consectetur amet. Sapien tincidunt ipsum enim id magna.'
};

export const blockquoteDefaultConfigs = {
  text: '“For larger businesses, identifying and executing the correct SEO strategies can be especially difficult. Enterprise-level companies are more likely to have complex technical challenges that make SEO difficult and investors."'
};

export const linkDefaultConfigs = {
  text: 'Link text',
  underlined: false,
  color: '#3e839e'
};

export const listDefaultConfigs = {
  type: 'ordered',
  bulletStyle: 'disc',
  large: false
};

export const tableDefaultConfigs = {
  rowNumber: 2,
  columnNumber: 3,
  highlightedColumn: 3,
  firstRowIsHeading: true,
  firstColumnIsHeading: true,
  enableScrollbarOnMobile: true
};

export const costGraphDefaultConfigs = {
  numberOfColumns: 4,
  highlightedColumn: 2,
  firstColumnHeight: 142,
  secondColumnHeight: 150,
  thirdColumnHeight: 60,
  fourthColumnHeight: 17,
  firstColumnTitle: '< $10,000',
  secondColumnTitle: '$10,000 - $49,999',
  thirdColumnTitle: '$50,000 - $199,999',
  fourthColumnTitle: '$200,000'
};
