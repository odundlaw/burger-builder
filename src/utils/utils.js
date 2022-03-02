export const reduceIgObject = (igObject) => {
  return Object.keys(igObject)
    .map((igKeys) => igObject[igKeys])
    .reduce((sum, currElement) => sum + currElement, 0);
};

export const searcParamsToObject = (params) => {
  const object = {};
  let totalPrice;
  for (const [key, value] of params.entries()) {
    if (key === "totalPrice") {
      totalPrice = value;
    } else {
      object[key] = +value;
    }
  }
  return [object, totalPrice];
};

export const objToIterables = (obj) => {
  let array = [];
  for (const [key, value] of Object.entries(obj)) {
    array.push({ name: key, amount: +value });
  }
  return array;
};

export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (rules.minLength) {
    isValid = value.trim().length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.trim().length <= rules.maxLength && isValid;
  }

  return isValid;
};
