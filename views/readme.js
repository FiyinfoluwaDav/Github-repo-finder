  document.querySelectorAll('.summarize-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const index = button.dataset.index;
      const readme = document.getElementById(`readme-${index}`).value;
      const summaryDiv = document.getElementById(`summary-${index}`);
      summaryDiv.innerHTML = "Summarizing...";

      try {
        const response = await fetch('/summarize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ readme })
        });
        const data = await response.json();
        summaryDiv.innerHTML = data.summary; // Display AI summary
      } catch (err) {
        summaryDiv.innerHTML = "Error summarizing README.";
        console.error(err);
      }
    });
  });
