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

export const getFriendList = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
    const response = await fetch(`${apiUrl}/user/friend-list/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // Add this line
      },
    });
    const result = await response.json();
    console.log(result);

    return result?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const addUserToFriendList = async (userId, friendId) => {
  try {
    const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
    const response = await fetch(`${apiUrl}/user/friend-list/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add this line
      },
      body: JSON.stringify({ friendId: friendId }),
    });
    const result = await response.json();
    console.log(result);

    return result?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
export const getChatHistory = async (userId) => {
  try {
    const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
    const response = await fetch(`${apiUrl}/message/chat-history/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Add this line
      },
    });
    const result = await response.json();

    return result?.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateUserAvatar = async (formData, id) => {
  const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
  const response = await fetch(`${apiUrl}/user/avatar/${id}`, {
    method: "POST",
    body: formData,
  });
  const result = await response.json();
  console.log(result);

  return result?.data;
};

export const updateUserData = async (data, id) => {
  try {
    console.log(data);
    const apiUrl = import.meta.env.VITE_APP_BACKEND_IP_ADDRESS;
    const response = await fetch(`${apiUrl}/user/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Add this line
      },
      body: JSON.stringify({data:data}),
    });
    const result = await response.json();
    console.log(result);

    return result?.data;
  } catch (error) {
    console.log(error);
  }
};
