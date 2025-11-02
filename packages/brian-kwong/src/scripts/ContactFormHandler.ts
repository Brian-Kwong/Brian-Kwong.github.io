const backendURL =
    "https://2dzhwykl63pwypihcvhyqla3zi0zpswr.lambda-url.us-east-1.on.aws/post-contact-form";

const verifyForm = (name: string, email: string, message: string): string => {
    if (name.trim() === "") return "Please enter your name.";
    if (email.trim() === "") {
        return "Please enter your email address.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Please enter a valid email address.";
    }
    if (message.trim() === "") {
        return "Message cannot be empty.";
    }
    return "";
};

const submitForm = async (
    name: string,
    email: string,
    message: string,
    completion: () => void,
    errorHandler: (error: string) => void
): Promise<void> => {
    try {
        const result = await fetch(backendURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, message }),
        });

        if (!result.ok) {
            errorHandler(`HTTP error! status: ${result.status}`);
        } else {
            completion();
        }
    } catch (error) {
        errorHandler(`Network error: ${error}`);
    }
};

export { verifyForm, submitForm };
