// Create and inject styles for the buttons
console.log("Content script loaded");
document.addEventListener("mouseup", async () => {
  const selectedText = window.getSelection().toString().trim();

  // Remove previous button if it exists
  const existingButton = document.getElementById("ai-tools-button-wrapper");
  if (existingButton) existingButton.remove();

  // Only create buttons if text is selected
  if (selectedText) {
    const range = window.getSelection().getRangeAt(0);
    const rect = range.getBoundingClientRect();

    const buttonWrapper = document.createElement("div");
    buttonWrapper.style.zIndex = "9999";
    buttonWrapper.style.color = "black";
    buttonWrapper.id = "ai-tools-button-wrapper";
    buttonWrapper.style.position = "absolute";
    buttonWrapper.style.top = `${rect.bottom + window.scrollY + 5}px`;
    buttonWrapper.style.left = `${rect.left + window.scrollX}px`;
    buttonWrapper.style.zIndex = 9999;
    buttonWrapper.style.display = "flex";
    buttonWrapper.style.gap = "5px";
    buttonWrapper.style.backgroundColor = "white";
    buttonWrapper.style.padding = "5px";
    buttonWrapper.style.borderRadius = "4px";
    buttonWrapper.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)";

    const summarizeButton = document.createElement("div");
    summarizeButton.textContent = "Summarize";
    summarizeButton.className = "summarize-button";
    summarizeButton.style.padding = "4px 8px";
    summarizeButton.style.border = "1px solid #ccc";
    summarizeButton.style.borderRadius = "3px";
    summarizeButton.style.backgroundColor = "#fff";
    summarizeButton.style.cursor = "pointer";

    const rewriteButton = document.createElement("div");
    rewriteButton.textContent = "Rewrite"; 
    rewriteButton.className = "rewrite-button";
    rewriteButton.style.padding = "4px 8px";
    rewriteButton.style.border = "1px solid #ccc";
    rewriteButton.style.borderRadius = "3px";
    rewriteButton.style.backgroundColor = "#fff";
    rewriteButton.style.cursor = "pointer";

    // Add button event listeners
    summarizeButton.addEventListener("click", (event) => {
      event.stopPropagation();
      alert(`Summarizing: "${selectedText}"`);
      console.log(`Summarizing: "${selectedText}"`);
    });

    rewriteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      alert(`Rewriting: "${selectedText}"`);
      console.log(`Rewriting: "${selectedText}"`);
    });

    buttonWrapper.appendChild(summarizeButton);
    buttonWrapper.appendChild(rewriteButton);
   
    document.body.insertAdjacentElement('beforeend', buttonWrapper);
  }
});
