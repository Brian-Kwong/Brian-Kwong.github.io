const backendURL =
    "https://3yks25mcrltflcshp6y3bvxl540jisfh.lambda-url.us-east-1.on.aws/website-agent-chat";

const processUserMessage = async (
    message: string,
    previousMessages: { message: string; isUser: boolean }[]
): Promise<string> => {
    try {
        const response = await fetch(backendURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                previousMessages: previousMessages
                    .slice(
                        previousMessages.length > 10
                            ? previousMessages.length - 10
                            : 0,
                        previousMessages.length - 1
                    )
                    .map((msg) => {
                        return {
                            content: msg.message,
                            role: msg.isUser ? "user" : "assistant",
                        };
                    }),
            }),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.message;
    } catch {
        return "Sorry, I couldn't process your message. Please try again later.";
    }
};

export default processUserMessage;
