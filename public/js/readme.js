// /public/js/readme.js
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".summarize-button");
  let activeCard = null;

  buttons.forEach(button => {
    button.addEventListener("click", async (event) => {
      event.stopPropagation(); // prevent immediate close
      const index = button.dataset.index;
      const readme = document.getElementById(`readme-${index}`).value;
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
      summaryDiv.innerHTML = "⏳ Summarizing...";
      activeCard = summaryDiv;

      try {
        const response = await fetch("/api/summarize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ readme })
        });

        const data = await response.json();
        summaryDiv.innerHTML = `
          <div class="summary-card">
            <p>${data.summary || "⚠️ No summary returned."}</p>
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
