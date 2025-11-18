// /public/js/readme.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".summarize-button");
  let activeCard = null;

  buttons.forEach(button => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation(); // prevent immediate close
      const index = button.dataset.index;
      const owner = button.dataset.owner;
      const repo = button.dataset.repo;
      const summaryDiv = document.getElementById(`summary-${index}`);

      // Close any previously open card
      if (activeCard && activeCard !== summaryDiv) {
        activeCard.style.display = "none";
      }

      // Toggle visibility
      if (summaryDiv.style.display === "block") {
        summaryDiv.style.display = "none";
        activeCard = null;
        return;
      }

      summaryDiv.style.display = "block";
      summaryDiv.innerHTML = '<div class="loader"></div>';
      activeCard = summaryDiv;

      try {
        // First, fetch the README content
        const readmeResponse = await fetch(`/api/readme/${owner}/${repo}`);
        if (!readmeResponse.ok) {
          throw new Error('README not found.');
        }
        const readme = await readmeResponse.text();

        // Now, summarize the README
        const summaryResponse = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ readme })
        });

        const data = await summaryResponse.json();
        summaryDiv.innerHTML = `
          <div class="summary-card">
            <pre><code>${data.summary || "⚠️ No summary returned."}</code></pre>
          </div>
        `;
      } catch (err) {
        console.error(err);
        summaryDiv.innerHTML = `<div class="summary-card error">❌ Error generating summary.</div>`;
      }
    });
  });

  // Hide summary card when clicking outside
  document.addEventListener("click", () => {
    if (activeCard) {
      activeCard.style.display = "none";
      activeCard = null;
    }
  });
});
