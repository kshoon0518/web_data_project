const setError = (msg, status) => {
  const err = new Error(msg);
  err.status = status;
  throw err;
};

export { setError };
