export const convertToBoolean = (value) => {
  return value === "true" ? true : value === "false" ? false : undefined;
};
