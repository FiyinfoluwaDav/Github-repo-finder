document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".clone-button");

  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const cloneUrl = button.dataset.cloneUrl;
      
      navigator.clipboard.writeText(cloneUrl).then(() => {
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = "Clone Repo";
        }, 2000);
      }).catch(err => {
        console.error("Failed to copy: ", err);
      });
    });
  });
});
