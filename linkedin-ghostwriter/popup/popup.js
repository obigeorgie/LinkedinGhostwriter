async function getApiKey() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['apiKey'], (result) => {
      resolve(result.apiKey);
    });
  });
}

async function summarizeWithGemini(text) {
  const API_KEY = await getApiKey();
  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
  
  const response = await fetch(`${url}?key=${API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `Summarize this in 1-2 sentences for a LinkedIn post, focusing on failures turned into lessons:\n\n${text}`
        }]
      }]
    })
  });
  
  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

async function makeHumblebrag(summary) {
  const PROMPT = `Rewrite this LinkedIn post to sound humble yet impressive. Use phrases like "learned the hard way" and "grateful for the journey". Keep it under 200 characters. Text: ${summary}`;
  
  // Using DeepSeek-R1 API (replace with actual endpoint)
  const response = await fetch("YOUR_DEEPSEEK_ENDPOINT", {
    method: "POST",
    headers: { "Authorization": `Bearer ${DEEPSEEK_KEY}` },
    body: JSON.stringify({ messages: [{ role: "user", content: PROMPT }] })
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// Main execution flow
chrome.storage.local.get(['selectedText'], async (result) => {
  const text = result.selectedText;
  if (text) {
    const summary = await summarizeWithGemini(text);
    const humblebrag = await makeHumblebrag(summary);
    document.getElementById('output').value = humblebrag;
    document.querySelector('.loader').style.display = 'none';
  }
});

// Copy to clipboard functionality
document.getElementById('copy').addEventListener('click', () => {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
});
