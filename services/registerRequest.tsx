export const registerRequest = async (
  email: string,
  password: string,
  username: any,
) => {
  try {
    const data = {
      email: email.trim(),
      password: password.trim(),
      username: username.trim().toLowerCase(),
    };
    const result = await fetch(
      "https://api.freeapi.app/api/v1/users/register",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    const response = await result.json();
    return response;
  } catch (error) {
    console.log("Send OTP Error>>>>>xww", error);
    throw error;
  }
};
