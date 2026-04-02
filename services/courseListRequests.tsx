export const courseListRequest = async () => {
    try {
      
        const result = await fetch("https://api.freeapi.app/api/v1/public/randomusers", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
        });
        const response = await result.json();
        return response.data;
    } catch (error) {
        console.log("Send OTP Error>>>>>xww", error);
        throw error;
    }
};