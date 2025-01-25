document.addEventListener('DOMContentLoaded', function() {
  // Load saved API keys
  chrome.storage.sync.get(['apiKey', 'deepseekKey'], function(result) {
    document.getElementById('apiKey').value = result.apiKey || '';
    document.getElementById('deepseekKey').value = result.deepseekKey || '';
  });

  // Save API keys
  document.getElementById('options-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const apiKey = document.getElementById('apiKey').value;
    const deepseekKey = document.getElementById('deepseekKey').value;
    
    chrome.storage.sync.set({
      apiKey: apiKey,
      deepseekKey: deepseekKey
    }, function() {
      // Show confirmation
      const button = document.querySelector('button');
      button.textContent = 'Saved!';
      setTimeout(() => {
        button.textContent = 'Save';
      }, 2000);
    });
  });
});
