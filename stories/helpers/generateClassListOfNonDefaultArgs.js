import { camelCaseToKebabCase } from './camelCaseToKebabCase';


// This helper function compares default component parameters with passed args
// and creates an array of BEM styled kebab-case classnames for non-default parameters.
//
// It can be used for both boolean flags and string values.
//
// Params:

// givenArgObject - Your component parameters. Key values can be boolean (classname will be created using key name)
// or string (classname will be created using key value). All keys will be iterated and turned into classnames.
//
// defaultArgObject - Default configs object with any keys and value types. Only keys that exist in givenArgObject
// will be iterated.
//
// The default  object of params can look like this:
//
// const defaultArgs = {
//   stretched: false,
//   withoutArrow: false,
//   filled: false,
//   size: 'md',
//   outlineSize: 'thin-outlines',
//   anotherKey: 'some value',
//   oneMoreKey: null
// };
//
// So you may want to build classnames only for part of parameters. Your object may look like this:
// (look, there is only non-default value for example)
//
// const myArgsToAddClassNames = {
//   stretched: true,
//   withoutArrow: true,
//   filled: false,
//   size: 'xs',
//   outlineSize: 'thick-outlines'
// };
//
// Also you should pass the element className, that will be used as prefix.
//
// const prefix = 'myElement';
//
// The result should look like this:
// [
//   'myElement--stretched',
//   'myElement--without-arrow',
//   'myElement--xs',
//   'myElement--thick-outlines'
// ]

// So you can add it in class list just like that.


export const generateClassListOfNonDefaultArgs = (givenArgObject, defaultArgObject, elementClassName) => {
  const result = [];
  Object.keys(givenArgObject).forEach((arg, index) => {
    const valueIsNotEqualToDefault = givenArgObject[arg] !== defaultArgObject[arg];
    const argIsFlag = typeof defaultArgObject[arg] === 'boolean';

    if (valueIsNotEqualToDefault) {
      let modifier;
      if (argIsFlag) {
        modifier = camelCaseToKebabCase(Object.keys(givenArgObject)[index]);
        result.push(`${elementClassName}--${modifier}`);
        return;
      }
      modifier = camelCaseToKebabCase(givenArgObject[arg]);
      result.push(`${elementClassName}--${modifier}`);
    }
  })
  return result;
};
