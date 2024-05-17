const axios = require("axios");

const API_URL = process.env.REACT_APP_API_URL;

const getUser = async (userId) => {
  try {
    console.log(`${API_URL}/user/${userId}`);
    const res = await fetch(`${API_URL}/user/${userId}`);
    const data = await res.json();
    // console.log(data.data)
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (userId, propsToUpdate) => {
  try {
    const res = await fetch(`${API_URL}/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(propsToUpdate),
    });
    const data = await res.json();
    console.log(data)
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, updateUser };
