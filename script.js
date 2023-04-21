const form = document.getElementById("koan-form");
const result = document.getElementById("result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const theme = document.getElementById("theme").value;
  generateZenKoan(theme);
});

async function generateZenKoan(theme) {
  const message = {
    "role": "system",
    "content": `write me a 10-word zen koan about "${theme}":`
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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" // Include the API key in the Authorization header (use your own key)
    },
    body: JSON.stringify({
      messages: [message],
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.8,
      model: "gpt-3.5-turbo"
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const message = data.choices[0].message;
    if (message && message.content) {
      const koan = message.content.trim().split('\n')[0];
      result.textContent = `Generated Zen Koan: "${koan}"`;
    } else {
      result.textContent = "An error occurred. Please try again.";
    }
  } else {
    result.textContent = "An error occurred. Please try again.";
  }
}
