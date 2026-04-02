export const Login = async (email: string, password: string) => {
    try {
        const data = {
            "email": email,
            "password": password
        }
        const result = await fetch("https://api.freeapi.app/api/v1/users/login", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const response = await result.json();
        return response;
    } catch (error) {
        console.log("Send OTP Error>>>>>xww", error);
        throw error;
    }
};