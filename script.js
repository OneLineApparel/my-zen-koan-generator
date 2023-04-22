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
  
  const token = "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";
  const url = "https://api.github.com/repos/OneLineApparel/my-zen-koan-generator/actions/secrets/ZENKEYGIT";
  let secret = ""
  
  fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/vnd.github+json",
      "Authorization": `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // I think the secret should be on data but am confused about the details
    secret = data["secret"]
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${secret}` // Include the API key in the Authorization header (use your own key)
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
