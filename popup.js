// Line 4 - UI Animation & Event Handlers: Handles icon hover animations and event listeners
// Line 45 - write(): Handles write/rewrite header styling and textarea placeholder text
// Line 89 - selectwriter(): Determines whether to call writeai() or rewriteai() based on active header
// Line 102 - Focus Effects: Manages focus styling for various textareas
// Line 156 - promptai(): Handles chat interactions with AI language model
// Line 262 - Pre-prompt Handlers: Manages pre-prompt selection and display
// Line 297 - translateai(): Handles text translation functionality
// Line 349 - Summary Functions: Manages text summarization options and functionality 
// Line 516 - writeai(): Handles AI text generation
// Line 544 - rewriteai(): Handles AI text rewriting
// Line 563 - Popup Functions: Manages popup display and interactions
// Line 644 - View Toggle Functions: Handles switching between different views
// Line 666 - History Functions: Manages interaction history storage and display
// Line 784 - Navigation Functions: Handles navigation icon interactions
// Line 831 - Message Listeners: Manages Chrome runtime message handling
// Line 859 - Language Selection: Handles language dropdown functionality
  // Assuming you saved it in your 'scripts' folder
  import DOMPurify from "./scripts/DOMPurify.js";  // Assuming you saved it in your 'scripts' folder
  import { marked } from "./scripts/Marked.js"; 
// ===============================
// UI Animation & Event Handlers
// ===============================

// Set initial body opacity
document.body.style.opacity = '0';

// When DOM content is loaded, fade in the body
setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
}, 1000);


// Event Listeners for Icons
const icons = document.getElementsByClassName("icons-img");
for (let i = 0; i < icons.length; i++) {
    icons[i].addEventListener("mouseover", function() {
        icons[i].style.width = "28px";
        icons[i].style.height = "28px";
    });
    icons[i].addEventListener("mouseout", function() {
        icons[i].style.width = "25px";
        icons[i].style.height = "25px";
    });
}



// ===============================
// Write/Rewrite Functionality
// ===============================

async function write() {
    const writeheader = document.querySelector('.writeh1');
    const rewriteheader = document.querySelector('.rewriteh1');
    const textarea = document.querySelector('#writetextarea');
    
    if (writeheader && writeheader.classList.contains('active')) {
        rewriteheader.style.color = 'grey';
        writeheader.style.color = 'black';
        textarea.placeholder = 'Enter the topic you want to write about';
    } else if (rewriteheader && rewriteheader.classList.contains('active')) {
        rewriteheader.style.color = 'black';
        writeheader.style.color = 'grey';
        textarea.placeholder = 'Enter the topic you want to rewrite about';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const writeheader = document.querySelector('.writeh1');
    const rewriteheader = document.querySelector('.rewriteh1');
    
    writeheader.addEventListener('click', () => {
        writeheader.classList.add('active');
        writeheader.classList.remove('inactive');
        rewriteheader.classList.add('inactive');
        rewriteheader.classList.remove('active');
        write();
    });
    
    rewriteheader.addEventListener('click', () => {
        rewriteheader.classList.add('active');
        rewriteheader.classList.remove('inactive');
        writeheader.classList.add('inactive');
        writeheader.classList.remove('active');
        write();
    });
    
    write();
});



document.getElementById('writeSubmit').addEventListener('click', () => {
    
    console.log("clicked");
});


// ===============================
// Focus Effects
// ===============================

const wrappers = document.querySelectorAll(".write-question-wrapper, .summary-main, .translate-main, .chat-wrapper");
wrappers.forEach(wrapper => {
    wrapper.style.transition = "border-color 0.3s ease";
});

// Write textarea focus
const writeTextarea = document.querySelector("#writetextarea");
const writeWrapper = document.querySelector(".write-question-wrapper");
writeTextarea.addEventListener("focus", () => {
    writeWrapper.style.transition = "all 0.3s ease";
    writeWrapper.classList.add("purple-focus");
});
writeTextarea.addEventListener("blur", () => {
    writeWrapper.style.transition = "all 0.3s ease";
    writeWrapper.classList.remove("purple-focus");
});

// Summary textarea focus
const summaryTextarea = document.querySelector(".summary-textarea");
const summaryWrapper = document.querySelector(".summary-main");
summaryTextarea.addEventListener("focus", () => {
    summaryWrapper.style.transition = "all 0.3s ease";
    summaryWrapper.classList.add("purple-focus");
});
summaryTextarea.addEventListener("blur", () => {
    summaryWrapper.style.transition = "all 0.3s ease";
    summaryWrapper.classList.remove("purple-focus");
});

// Translate textarea focus
const translateTextarea = document.querySelector(".textarea-translate");
const translateWrapper = document.querySelector(".translate-main");
translateTextarea.addEventListener("focus", () => {
    translateWrapper.style.transition = "all 0.3s ease";
    translateWrapper.classList.add("purple-focus");
});
translateTextarea.addEventListener("blur", () => {
    translateWrapper.style.transition = "all 0.3s ease";
    translateWrapper.classList.remove("purple-focus");
});

// Chat textarea focus
const chatTextarea = document.querySelector("#promptaitxt");
const chatWrapper = document.querySelector(".chat-wrapper");
chatTextarea.addEventListener("focus", () => {
    chatWrapper.style.transition = "all 0.3s ease";
    chatWrapper.classList.add("purple-focus");
});
chatTextarea.addEventListener("blur", () => {
    chatWrapper.style.transition = "all 0.3s ease";
    chatWrapper.classList.remove("purple-focus");
});

// ===============================
// AI Model Functions
// ===============================



async function promptai(inputText = null) {
    const splinelm = document.querySelector(".splinelm");
    const preprompt = document.querySelector(".pre-prompt");
    const message = document.querySelector(".main-answer");
    const chatans = document.querySelector(".chat-answer");
    const question = document.querySelector(".question");
    const capabilities = await ai.languageModel.capabilities();
    const option = document.querySelector(".options");
    
    if (capabilities.available !== "no") {
        const session = await ai.languageModel.create({
            temperature: 1,
            topK: 0.3
        });

        // Use provided inputText or get from textarea
        const textToUse = inputText || document.getElementById('promptaitxt').value;

        // Handle input
        if (textToUse) {
            await handleChatResponse(session, textToUse);
        }

        async function handleChatResponse(session, text) {
            console.log("handleChatResponse");
        
            // Trigger transitions
            setTimeout(() => {
                splinelm.style.opacity = '0';
                preprompt.style.opacity = '0';
                
                // Add fade in smooth transitions to chatans
                chatans.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
                chatans.style.opacity = '0';
                chatans.style.transform = 'translateY(20px)';
                chatans.style.display = 'flex';
                
                setTimeout(() => {
                    chatans.style.opacity = '1';
                    chatans.style.transform = 'translateY(0)';
                }, 10);
                
                // Hide elements after fade out
                splinelm.style.display = 'none';
                preprompt.style.display = 'none';
            }, 300);
            
            const stream = session.promptStreaming(text);
            question.innerText = text;
            message.style.transition = 'opacity 0.3s ease-in-out';
            message.style.opacity = '0';
            setTimeout(() => {
                message.innerText = "Generating text...";
                message.style.animation = 'fadeInOut 2s ease-in-out infinite';
                // Add keyframes if not already in CSS
                if (!document.querySelector('#fadeInOutKeyframes')) {
                    const style = document.createElement('style');
                    style.id = 'fadeInOutKeyframes';
                    style.textContent = `
                        @keyframes fadeInOut {
                            0% { opacity: 0.3; }
                            50% { opacity: 1; }
                            100% { opacity: 0.3; }
                        }`;
                    document.head.appendChild(style);
                }
                message.style.opacity = '1';
            }, 10);
            
            for await (const chunk of stream) {
                // Stop the animation when we start receiving chunks
                message.style.animation = 'none';
                message.style.transition = 'opacity 0.3s ease-in-out';
                message.style.opacity = '0';
                setTimeout(() => {
                    const sanitizedHtml = customTextPurifier(chunk);
                    message.innerHTML = sanitizedHtml;
                    console.log(sanitizeHTML);
                    message.style.opacity = '1';
                }, 10);
            }
            
            option.style.display = 'flex';
            setTimeout(() => {
                option.style.opacity = '1';
            }, 400);

            // After the streaming is complete, set up the button handlers
            setupOptionButtons(text, message.innerHTML);
        }

        session.destroy();
    } else {
        // Model not available
        setTimeout(() => {
            splinelm.style.opacity = '0';
            preprompt.style.opacity = '0';
            
            // Add fade in smooth transitions to chatans
            chatans.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
            chatans.style.opacity = '0';
            chatans.style.transform = 'translateY(20px)';
            chatans.style.display = 'flex';
            
            setTimeout(() => {
                chatans.style.opacity = '1';
                chatans.style.transform = 'translateY(0)';
            }, 10);
            
            // Hide elements after fade out
            splinelm.style.display = 'none';
            preprompt.style.display = 'none';
        }, 300);
        
        message.innerText = "Model not available. Please try again later.";
        message.style.opacity = '1';
        option.style.display = 'none';
    }
}

function setupOptionButtons(questionText, answerText) {
    // Copy button
    document.querySelector('.promptai-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(answerText)
            .then(() => showToast('Copied to clipboard!'))
            .catch(err => showToast('Failed to copy text'));
    });

    // Redo button
    document.querySelector('.promptai-redo').addEventListener('click', () => {
        promptai(questionText); // Re-run the prompt with the same text
    });

    // Quote button
    document.querySelector('.promptai-quote').addEventListener('click', () => {
        const quotedText = `Question: ${questionText}\nAnswer: ${answerText}`;
        navigator.clipboard.writeText(quotedText)
            .then(() => showToast('Quoted text copied to clipboard!'))
            .catch(err => showToast('Failed to copy quoted text'));
    });

    // Share button
    document.querySelector('.promptai-share').addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'AI Chat Response',
                text: `Question: ${questionText}\nAnswer: ${answerText}`,
            })
            .catch(err => showToast('Failed to share'));
        } else {
            showToast('Sharing not supported on this browser');
        }
    });
}

// Helper function for showing toast messages
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Add this CSS to your stylesheet
    const style = document.createElement('style');
    style.textContent = `
        .toast {
            position: fixed;
            bottom: 20px;
            left: 44%;
            transform: translateX(-50%);
            background: linear-gradient(71deg, rgba(157,0,122,1) 24%, rgba(255,0,213,1) 95%);
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(155, 77, 202, 0.3);
            z-index: 1000;
            animation: fadeInOut 2.5s ease-in-out forwards;
            font-weight: 500;
            letter-spacing: 0.3px;
        }
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            15% { opacity: 1; transform: translate(-50%, 0); }
            85% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    document.head.appendChild(style);

    // Remove toast after animation
    setTimeout(() => {
        document.body.removeChild(toast);
    }, 2500);
}

// ===============================
// Pre-prompt Handlers
// ===============================

const prePromptDivs = document.querySelectorAll('.pre-prompt-div');
prePromptDivs.forEach(div => {
    div.addEventListener('click', async () => {
        console.log("clicked");
        const promptText = div.querySelector('h1').textContent;
        console.log(promptText);
        
        const promptaitxt = document.getElementById('promptaitxt');
        promptaitxt.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
        promptaitxt.style.opacity = '0';
        promptaitxt.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            promptaitxt.value = promptText;
            promptaitxt.style.opacity = '1';
            promptaitxt.style.transform = 'translateY(0)';
        }, 300);
        
        await promptai(promptText);
        console.log("done");
    });
});

// Add event listener for Enter key and button click
document.getElementById('promptaitxt').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        promptai();
    }
});

document.getElementById('promptaiButton').addEventListener('click', promptai);

// ===============================
// Translation Functions
// ===============================

async function translateai() {
    const inputText = document.querySelector(".textarea-translate").value;
    const answerdiv = document.querySelector(".translate-answer");
    const answer = document.querySelector("#translate-anss");
    const targetLanguage = document.querySelector('.final-language-dropdown').value;
    
    const translationOptions = {
        sourceLanguage: 'en',
        targetLanguage: targetLanguage,
    };
    
    try {
        const translator = await translation.createTranslator(translationOptions);
        const translationResult = await translator.translate(inputText);
        
        answerdiv.style.display = 'flex';
        answerdiv.style.opacity = '0';
        answer.innerText = 'Generating translation...';

        // Add fade in animation
        requestAnimationFrame(() => {
            answerdiv.style.transition = 'opacity 0.5s ease';
            answerdiv.style.opacity = '1';
            
            setTimeout(() => {
                answer.style.transition = 'opacity 0.3s ease';
                answer.style.opacity = '0';
                
                setTimeout(() => {
                    answer.innerText = translationResult;
                    answer.style.opacity = '1';
                }, 300);
            }, 500);
        });
        
    } catch (error) {
        answerdiv.style.display = 'flex';
        answerdiv.style.opacity = '0';
        answer.innerText = `Error: ${error.message}`;

        // Add fade in animation for error
        requestAnimationFrame(() => {
            answerdiv.style.transition = 'opacity 0.5s ease';
            answerdiv.style.opacity = '1';
        });
    }
}

// Add event listeners for translate button and Enter key
document.querySelector('.textarea-translate').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        translateai();
    }
});

// ===============================
// Summary Functions
// ===============================

const summaryOptions = {
    style: 'keyPoints',
    length: 'short', 
    format: 'plain-text'
};

document.getElementById('toggleSummaryPopup').addEventListener('click', function() {
    const popup = document.getElementById('popupSelectorsummary');
    if(popup.style.display === 'none') {
        popup.style.display = 'flex';
        popup.style.transform = 'scale(0.95)';
        popup.style.opacity = '0';
        
        // Add smooth transitions
        popup.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
        
        setTimeout(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'scale(1)';
        }, 10);
    } else {
        popup.style.opacity = '0';
        popup.style.transform = 'scale(0.95)';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
});


function selectSummaryOption(button) {
    const type = button.dataset.type;
    const value = button.dataset.value;
    
    const section = button.closest('.option-section');
    section.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
        opt.style.transition = 'all 0.3s ease';
        opt.style.backgroundColor = '#f0f0f0';
        opt.style.color = '#000000';
    });
    
    button.classList.add('selected');
    button.style.transition = 'all 0.3s ease';
    button.style.backgroundColor = '#6128FF';
    button.style.color = '#ffffff';
    
    summaryOptions[type] = type === 'format' ? 
        (value === 'plaintext' ? 'plain-text' : 'markdown') : 
        value;
    
    // Update the selected options display with transition
    const selectedOptionsDiv = document.querySelector('.selected-options');
    const selectedSpan = selectedOptionsDiv.querySelector(`#selected-${type}`);
    if (selectedSpan) {
        selectedSpan.style.transition = 'opacity 0.3s ease';
        selectedSpan.style.opacity = '0';
        setTimeout(() => {
            selectedSpan.textContent = button.textContent;
            selectedSpan.style.opacity = '1';
        }, 150);
    }
}

document.addEventListener('click', function(e) {
    const popup = document.getElementById('popupSelectorsummary');
    const optionsDropdown = document.querySelector('.options-dropdown');
    if (!popup.contains(e.target) && !optionsDropdown.contains(e.target)) {
        popup.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        popup.style.opacity = '0';
        popup.style.transform = 'scale(0.95)';
        setTimeout(() => popup.style.display = 'none', 300);
    }
});

document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', function() {
        const type = this.dataset.type;
        const value = this.dataset.value;
        
        const section = this.closest('.option-section');
        section.querySelectorAll('.option').forEach(opt => {
            opt.classList.remove('selected');
            opt.style.transition = 'all 0.3s ease';
            opt.style.backgroundColor = '#f0f0f0';
            opt.style.color = '#000000';
        });
        
        this.classList.add('selected');
        this.style.transition = 'all 0.3s ease';
        this.style.backgroundColor = '#6128FF';
        this.style.color = '#ffffff';
        
        summaryOptions[type] = type === 'format' ? 
            (value === 'plaintext' ? 'plain-text' : 'markdown') : 
            value;
        
        // Update the selected options display with transition
        const selectedOptionsDiv = document.querySelector('.selected-options');
        const selectedSpan = selectedOptionsDiv.querySelector(`#selected-${type}`);
        if (selectedSpan) {
            selectedSpan.style.transition = 'opacity 0.3s ease';
            selectedSpan.style.opacity = '0';
            setTimeout(() => {
                selectedSpan.textContent = this.textContent;
                selectedSpan.style.opacity = '1';
            }, 150);
        }
    });
});




async function summaryai() {
    const inputText = document.querySelector(".summary-textarea").value;
    const summaryDiv = document.querySelector('.summary-answer');
    const answer = document.querySelector('.summary-answer-wrapper');
    
    // Display summary div
    summaryDiv.style.display = 'flex';
    answer.style.transition = 'opacity 0.3s ease-in-out';
    answer.style.opacity = '0';
    setTimeout(() => {
        answer.innerText = "Generating summary...";
        answer.style.animation = 'fadeInOut 2s ease-in-out infinite';
        // Add keyframes if not already in CSS
        if (!document.querySelector('#fadeInOutKeyframes')) {
            const style = document.createElement('style');
            style.id = 'fadeInOutKeyframes';
            style.textContent = `
                @keyframes fadeInOut {
                    0% { opacity: 0.3; }
                    50% { opacity: 1; }
                    100% { opacity: 0.3; }
                }`;
            document.head.appendChild(style);
        }
        answer.style.opacity = '1';
    }, 10);

    try {
        const summarizer = await ai.summarizer.create(summaryOptions);
        console.log(summaryOptions);
        const stream = await summarizer.summarizeStreaming(inputText)
       
        
        let fullResponse = '';
        for await (const chunk of stream) {
            answer.style.animation = 'none';
        
           const te = marked.parse(chunk);
           console.log(te)
            const sanitizedHTML = DOMPurify.sanitize(te); // Sanitize the HTML
            console.log(sanitizedHTML)
            

            answer.innerHTML = sanitizedHTML;
        }

        // Reveal the answer with animation
        setTimeout(() => {
            answer.style.opacity = '1';
            answer.style.transform = 'translateY(0)';
        }, 300);
        
        // Add to history
        addToHistory('Summary', inputText, fullResponse);

        // Clean up the summarizer instance
        await summarizer.destroy();
    } catch (error) {
        console.error("Error during summarization:", error);

        // Transition for error message
        answer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        answer.style.opacity = '0';
        answer.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            answer.innerText = "Error processing the summary request.";
            answer.style.opacity = '1';
            answer.style.transform = 'translateY(0)';
        }, 300);
    }
}


// Add event listener for Enter key
document.querySelector(".summary-textarea").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        summaryai();
    }
});

// ===============================
// Write/Rewrite Functions
// ===============================

let selectedOptions = {};

async function selectOption(type, value) {
    selectedOptions[type] = value;
}
document.getElementById('writeSubmit').addEventListener('click', () => {
    const writeheader = document.querySelector('.writeh1');
    const rewriteheader = document.querySelector('.rewriteh1');
  
    
    if (writeheader && writeheader.classList.contains('active')) {
        writeai();
    } else if (rewriteheader && rewriteheader.classList.contains('active')) {
        rewriteai();
    }
});
async function writeai() {
    const inputText = document.querySelector('#writetextarea').value.trim();
    const ans = document.querySelector('.write-ans');
    const writeAnswerWrapper = document.querySelector('.write-answer-wrapper');
    writeAnswerWrapper.style.display = 'flex';

    if (!inputText) {
        ans.innerText = 'Please enter some text to write about.';
        return;
    }

    const styles = 'as-is';
    const format =  'plaintext';
    const length =  'short';

    try {
        const writer = await self.ai.writer.create({ styles, format, length });
        ans.innerText = 'Generating...';

        let generatedText = '';
        for await (const chunk of writer.writeStreaming(inputText)) {
            generatedText += chunk;
        }
        
        ans.innerText = generatedText;
        console.log(generatedText)
        await writer.destroy();
    } catch (error) {
        if (error.name === 'NotSupportedError') {
            ans.innerText = 'Unsupported language detected. Please use English.';
        } else {
            ans.innerText = 'Error processing the request. Please try again.';
        }
        console.error('Error during write:', error);
    }
}


async function rewriteai() {
    console.log("rewrite")
    const writeAnswerWrapper = document.querySelector(".write-answer-wrapper");
    const inputText = document.querySelector('#writetextarea').value;
    const ans = document.querySelector(".write-ans");

    writeAnswerWrapper.style.display = 'flex';
    try {
      
     
        let styles = selectedOptions['style'] ?? "as-is";
        let format = selectedOptions['format'] ?? "Plaintext";
        let length = selectedOptions['length'] ?? "Short";
        
        // Ensure display is set to flex before starting transition
       
      
        ans.innerText = 'Generating...';
     
        
        const rewriter = await ai.rewriter.create();
        const answer = await rewriter.rewrite(inputText);
        
        console.log(answer);
        
        ans.innerText = '';
        ans.innerText = answer;
        
        await rewriter.destroy();
    } catch (error) {
        console.error("Error during rewrite:", error);
        ans.innerText = "Error processing the rewrite request.";
    }
}

// ===============================
// Popup Functions
// ===============================

const popup = document.getElementById('popupSelector');
let isPopupOpen = false;

function togglePopup(show) {
    isPopupOpen = show;
    
    // Set initial transition properties
    popup.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
    
    if (show) {
        popup.style.display = 'block';
        // Slight delay to ensure display:block is processed
        requestAnimationFrame(() => {
            popup.style.opacity = '1';
            popup.style.transform = 'translateY(0) scale(1)';
        });
    } else {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(-10px) scale(0.95)';
        // Wait for transition to complete before hiding
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300);
    }
}

document.querySelector('.write-options-wrapper').addEventListener('click', function(e) {
    e.stopPropagation();
    togglePopup(!isPopupOpen);
});

document.addEventListener('click', function() {
    if (isPopupOpen) {
        togglePopup(false);
    }
});

popup.addEventListener('click', function(e) {
    e.stopPropagation();
});

function updateSelectedText(type, value) {
    const selectedElement = document.getElementById(`selected-${type}`);
    selectedElement.style.transition = 'transform 0.2s ease-out';
    selectedElement.style.transform = 'scale(1.05)';
    selectedElement.textContent = value;
    
    // Reset scale after text update
    setTimeout(() => {
        selectedElement.style.transform = 'scale(1)';
    }, 200);

    const buttons = document.querySelectorAll(`.option-section button`);
    buttons.forEach(btn => {
        btn.style.transition = 'all 0.2s ease-in-out';
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

// ===============================
// View Toggle Functions
// ===============================

function toggleview(id) {
    // Remove "toggle" from the ID to match the view elements
    const viewId = id.replace('toggle', '').toLowerCase();
    const views = document.querySelectorAll('.view');
    const elem = document.querySelector(`#${viewId}`);
    
    views.forEach(view => {
        view.style.transition = 'opacity 0.2s ease-out';
        view.style.opacity = '0';
        setTimeout(() => {
            view.style.display = 'none';
            view.setAttribute('isactive', 'false');
        }, 200);
    });
    
    if (elem) {
        setTimeout(() => {
            elem.style.display = 'flex';
            elem.setAttribute('isactive', 'true');
            elem.offsetHeight; // Trigger reflow
            elem.style.transition = 'opacity 0.2s ease-in';
            elem.style.opacity = '1';
        }, 200);
    }
}

// Update event listeners to use the correct class
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.icons').forEach(icon => {
        icon.addEventListener('click', function() {
            // Update active states of icons
            document.querySelectorAll('.icons').forEach(i => {
                i.querySelector('.icon-img-wrapper').style.backgroundColor = '';
                const img = i.querySelector('.nav-icon');
                img.src = img.dataset.grey;
            });
            
            // Set clicked icon as active
            this.querySelector('.icon-img-wrapper').style.backgroundColor = '#F7F7F8';
            const img = this.querySelector('.nav-icon');
            img.src = img.dataset.blue;
            
            toggleview(this.id);
        });
    });
});

// ===============================
// History Functions
// ===============================

function truncateText(text, wordLimit) {
    const words = text.split(' ');
    return words.length > wordLimit ? 
        words.slice(0, wordLimit).join(' ') + '...' : 
        text;
}

function loadHistory() {
    let history = JSON.parse(localStorage.getItem('aiHistory') || '[]');
    const historyList = document.querySelector('.history-list');
    
    history.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'history-item';
        itemElement.style.animationDelay = `${index * 0.1}s`;
        
        const truncatedInput = truncateText(item.input || '', 40);
        const truncatedOutput = truncateText(item.output || '', 40);
        
        itemElement.innerHTML = `
            <div class="history-type">${item.type}</div>
            <div class="history-content collapsed">
                <div class="history-input">
                    <strong>Input:</strong> 
                    <span class="truncated-text">${truncatedInput}</span>
                    <span class="full-text">${item.input || ''}</span>
                </div>
                <div class="history-output">
                    <strong>Output:</strong> 
                    <span class="truncated-text">${truncatedOutput}</span>
                    <span class="full-text">${item.output || ''}</span>
                </div>
            </div>
            <div class="history-time">${new Date(item.timestamp).toLocaleString()}</div>
        `;
        
        itemElement.addEventListener('click', () => {
            itemElement.querySelector('.history-content').classList.toggle('expanded');
        });
        
        historyList.appendChild(itemElement);
    });
}

function addToHistory(type, input, output) {
    const historyItem = {
        id: Date.now(),
        type: type,
        input: input,
        output: output,
        timestamp: new Date().toISOString()
    };
    
    let history = JSON.parse(localStorage.getItem('aiHistory') || '[]');
    history.unshift(historyItem);
    localStorage.setItem('aiHistory', JSON.stringify(history));
    
    const historyList = document.querySelector('.history-list');
    const itemElement = document.createElement('div');
    itemElement.className = 'history-item new-item';
    
    const truncatedInput = truncateText(input, 20);
    const truncatedOutput = truncateText(output, 20);
    
    itemElement.innerHTML = `
        <div class="history-type">${type}</div>
        <div class="history-content collapsed">
            <div class="history-input">
                <strong>Input:</strong> 
                <span class="truncated-text">${truncatedInput}</span>
                <span class="full-text">${input}</span>
            </div>
            <div class="history-output">
                <strong>Output:</strong> 
                <span class="truncated-text">${truncatedOutput}</span>
                <span class="full-text">${output}</span>
            </div>
        </div>
        <div class="history-time">${new Date(historyItem.timestamp).toLocaleString()}</div>
    `;
    
    itemElement.addEventListener('click', () => {
        const historyContent = itemElement.querySelector('.history-content');
        if (historyContent.classList.contains('expanded')) {
            historyContent.classList.remove('expanded');
            historyContent.classList.add('collapsed');
            historyContent.style.transition = 'max-height 0.3s ease-in-out';
            historyContent.style.maxHeight = '0';
        } else {
            historyContent.classList.remove('collapsed');
            historyContent.classList.add('expanded');
            historyContent.style.transition = 'max-height 0.3s ease-in-out';
            historyContent.style.maxHeight = historyContent.scrollHeight + 'px';
        }
    });
    
    historyList.insertBefore(itemElement, historyList.firstChild);
}

// ===============================
// Navigation Functions
// ===============================

document.addEventListener('DOMContentLoaded', function() {
    const icons = document.querySelectorAll('.nav-icon');
    
    function resetAllIcons() {
        icons.forEach(icon => {
            icon.src = icon.dataset.grey;
            icon.parentElement.style.backgroundColor = 'transparent';
        });
    }
    
    icons.forEach(icon => {
        icon.parentElement.addEventListener('mouseenter', () => {
            if (!icon.parentElement.parentElement.classList.contains('active')) {
                icon.src = icon.dataset.black;
            }
        });
        
        icon.parentElement.addEventListener('mouseleave', () => {
            if (!icon.parentElement.parentElement.classList.contains('active')) {
                icon.src = icon.dataset.grey;
            }
        });
        
        icon.parentElement.parentElement.addEventListener('click', () => {
            resetAllIcons();
            icon.src = icon.dataset.blue;
            icon.parentElement.style.backgroundColor = 'white';
            document.querySelectorAll('.icons').forEach(el => el.classList.remove('active'));
            icon.parentElement.parentElement.classList.add('active');
        });
    });
    
    const chatIcon = document.querySelector('.chat-icon img');
    chatIcon.src = chatIcon.dataset.blue;
    chatIcon.parentElement.style.backgroundColor = 'white';
    chatIcon.parentElement.parentElement.classList.add('active');
});

// ===============================
// Message Listeners
// ===============================

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
        document.getElementById('summarize').setAttribute('isactive', 'true');
        document.getElementById('summaryInput').value = request.text;
        toggleview('summarize');
    } else if (request.action === "rewrite") {
        document.getElementById('write').setAttribute('isactive', 'true'); 
        document.getElementById('writetextarea').value = request.text;
        toggleview('write');
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "summarize") {
        summarizeText(message.text);
    } else if (message.action === "rewrite") {
        rewriteText(message.text);
    }
    sendResponse({ status: "success", action: message.action });
});

// ===============================
// Language Selection
// ===============================

document.getElementById('languageSelect').addEventListener('change', function() {
    this.style.transform = 'scale(1.05)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

document.addEventListener('DOMContentLoaded', function() {
    const selectedLanguage = document.getElementById('selectedLanguage');
    const languageOptions = document.getElementById('languageOptions');
    const options = document.querySelectorAll('.language-option');

    selectedLanguage.addEventListener('click', function() {
        languageOptions.classList.toggle('show-options');
    });

    options.forEach(option => {
        option.addEventListener('click', function() {
            selectedLanguage.textContent = this.textContent;
            languageOptions.classList.remove('show-options');
            
            // Animation effect
            selectedLanguage.style.transform = 'scale(1.05)';
            setTimeout(() => {
                selectedLanguage.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.language-selector')) {
            languageOptions.classList.remove('show-options');
        }
    });
});

