export const searchUserController = async (text) => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
  const response = await fetch(`${apiUrl}/user/search?userName=${text}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Add this line
    },
  });
  const result = await response.json();
  console.log(result);

  return result?.data;
};

export const getUserById = async (id) => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
  const response = await fetch(`${apiUrl}/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Add this line
    },
  });
  const result = await response.json();
  console.log(result);

  return result?.data;
};
