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

const response = await fetch("https://us-central1-zenkoanproj2.cloudfunctions.net/ZENKOANFUNC2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      theme: theme
    })
  });


  if (response.ok) {
    const koan = await response.text();
    result.textContent = `Generated Zen Koan: "${koan}"`;
  } else {
    result.textContent = "An error occurred. Please try again.";
  }
}
