// todo: change to elegant solution to check if DOM loaded
export const runFunctionWhenElementLoaded = (elementId, callback) => {

  const checkExist = setInterval(() => {
    if (document.getElementById(elementId)) {
      callback(elementId);
      clearInterval(checkExist);
    }
  }, 500);

  setTimeout(() => clearInterval(checkExist), 3000);
};
