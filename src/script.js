const messageList = document.querySelector(".chat-box");
const input = document.querySelector(".chat-input input");
const sendButton = document.querySelector(".chat-input button");

const responses = {
    hello: "Cześć!",
    hi: "Siema! Co potrzeba?",
    cześć: "Hola! Co słychać?",
    bye: "Narka!",
    goodbye: "To bajo!",
    pa: "Miłego!",
    "a dobrze": "Super! A jak mogę Ci pomóc?",
    "co tam?": "Mega! A u Ciebie?",
    "spoko": "I git :)",
    default: "Nie jestem aż tak zaawansowany. Spróbuj zapytać o coś innego może..."
};

const forbiddenWords = ["motyla noga", "sigma", "kurczaki", "włanczać"];

function containsForbiddenWord(text) {
    text = text.toLowerCase();
    return forbiddenWords.some(word => text.includes(word));
}

function getResponse(inputText) {
    inputText = inputText.toLowerCase();
    if (responses[inputText]) {
        return responses[inputText];
    } else {
        return responses.default;
    }
}

function sendMessage() {
    if (input.value !== "") {
        const userInputText = input.value.toLowerCase();

        if (containsForbiddenWord(userInputText)) {
            alert("Halo? Policja? Nie używaj takich słów.");

            const botWarning = document.createElement("div");
            botWarning.classList.add("chat-message", "bot-message");
            botWarning.innerHTML = `<div class="chat-message-text" style="background-color: red; color: white;">Proszę, nie używaj takich słów.</div>`;
            messageList.appendChild(botWarning);

            messageList.scrollTop = messageList.scrollHeight;
            input.value = "";
            return;
        }

        const message = document.createElement("div");
        message.classList.add("chat-message", "user-message");
        message.innerHTML = `<div class="chat-message-text">${input.value}</div>`;
        messageList.appendChild(message);

        createSparkle(sendButton.offsetLeft + sendButton.offsetWidth / 2, sendButton.offsetTop);

        input.value = "";

        const typingMessage = document.createElement("div");
        typingMessage.classList.add("chat-message", "bot-message");
        typingMessage.innerHTML = `<div class="chat-message-text"><i>Bot pisze...</i></div>`;
        messageList.appendChild(typingMessage);

        messageList.scrollTop = messageList.scrollHeight;

        setTimeout(() => {
            typingMessage.remove();

            const responseText = getResponse(userInputText);
            const botMessage = document.createElement("div");
            botMessage.classList.add("chat-message", "bot-message");
            botMessage.innerHTML = `<div class="chat-message-text">${responseText}</div>`;
            messageList.appendChild(botMessage);

            messageList.scrollTop = messageList.scrollHeight;
        }, 1500);
    }
}

sendButton.addEventListener("click", sendMessage);

//ENTER
input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        sendMessage();
    }
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});
