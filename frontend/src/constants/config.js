export const CONFIG_JSON = {
  headers: {
    "Content-type": "application/json",
  },
};

export const getAuthorizedConfig = (token) => {
  const config = {
    headers: {
      Authorization: `Bearer: ${token}`,
    },
  };
  return config;
}
