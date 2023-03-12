const request = new Request('/api');
export const fetchTest = async () => {
  const response = await fetch(request);
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Something went wrong on API server!");
  }
};
