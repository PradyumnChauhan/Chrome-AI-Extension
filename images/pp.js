document.getElementById('actionButton').addEventListener('click', async function() {
  const inputText = document.getElementById('inputText').value.trim();
  const action = document.getElementById('actionSelect').value;
  const resultText = document.getElementById('resultText');
  const temperature = document.getElementById('temprature').value;
  const topK = document.getElementById('topK').value;
  // Clear result text area and show processing message
  resultText.innerText = 'Processing...';

  try {
    if (action === 'summarize') {
      await handleSummarize(inputText, resultText);
    } else if (action === 'rewrite') {
      await handleRewrite(inputText, resultText);
    } else if (action === 'write') {
      await handleWrite(inputText, resultText);
    }else if (action === 'translation') {
      await handleTranslation(inputText, resultText);
    }else if (action === 'languagedetection') {
      await handleLanguageDetection(inputText, resultText);
    }else if (action === 'promptai') {
      await handlePrompt(inputText, resultText, temperature, topK);
    }
  } catch (error) {
    console.error("Error processing the request:", error);
    resultText.innerText = "An error occurred. Please try again.";
  }
});

// Helper function to get the options for tone, format, and length
function getOptions() {
  const tone = document.getElementById('toneSelect').value;
  const format = document.getElementById('formatSelect').value;
  const length = document.getElementById('lengthSelect').value;

  return { tone, format, length };
}

// Handle the rewrite process with streaming
async function handleRewrite(text, resultText) {
  const { tone, format, length } = getOptions();
  
  try {
    const rewriter = await ai.rewriter.create();
    console.log("Rewriter created");

    const stream = await rewriter.rewriteStreaming(text);
    resultText.innerText = 'Analyzing...'; // Clear previous result

    // Stream result chunks and append them to the resultText
    for await (const chunk of stream) {
      resultText.innerText = chunk;
    }

    await rewriter.destroy();
    console.log("Rewriter destroyed");

  } catch (error) {
    console.error("Error during rewrite:", error);
    resultText.innerText = "Error processing the rewrite request.";
  }
}

// Handle the summarization process
async function handleSummarize(text, resultText) {
  const { tone, length } = getOptions(); // Use tone and length for summarization

  try {
    const summarizer = await ai.summarizer.create({
      tone,
      length
    });
    console.log("Summarizer created");

    const result = await summarizer.summarize(text);
    resultText.innerText = result;

    await summarizer.destroy();
    console.log("Summarizer destroyed");

  } catch (error) {
    console.error("Error during summarization:", error);
    resultText.innerText = "Error processing the summarize request.";
  }
}

// Handle the writing process with streaming
async function handleWrite(text, resultText) {
  const { tone, format, length } = getOptions();

  try {
    const writer = await ai.writer.create({
      tone,
      format,
      length
    });
    console.log("Writer created");

    const stream = await writer.writeStreaming(text);
    resultText.innerText = 'Generating...'; // Clear previous result

    // Stream result chunks and append them to the resultText
    for await (const chunk of stream) {
      resultText.innerText = chunk;
    }

    await writer.destroy();
    console.log("Writer destroyed");

  } catch (error) {
    console.error("Error during write:", error);
    resultText.innerText = "Error processing the write request.";
  }
}

async function handleTranslation(text, resultText) {
  const translationOptions = {
    sourceLanguage: 'en',
    targetLanguage: 'es',
  };

  const translator = await translation.createTranslator(translationOptions);

      // Perform translation
      const translationResult = await translator.translate(text);

      // Display the translated text
      resultText.innerText = translationResult;
      console.log("Translation: ", translationResult);
}
async function handleLanguageDetection(text, resultText) {
  const someUserText = text;
  detector = await translation.createDetector();
  const results = await detector.detect(someUserText);
  for (const result of results) {
  // Show the full list of potential languages with their likelihood
  // In practice, one would pick the top language(s) crossing a high enough threshold.
  resultText.innerText = result.detectedLanguage 
  console.log(result.detectedLanguage, result.confidence);

}
}
async function handlePrompt(promptText, resultText, temperature, topK) {
  // Retrieve the model capabilities
  const capabilities = await ai.languageModel.capabilities();

  // Check if the model is available
  if (capabilities.available !== "no") {
    // Create a new session using the max temperature and topK
    const session = await ai.languageModel.create({
      temperature: temperature, // Max temperature (use 1.0 if not available)
      topK: topK // Use max topK available
    });
   console.log("session Created")
    // Prompt the model and retrieve the result
    const stream = session.promptStreaming(promptText);
    
    for await (const chunk of stream) {
     resultText.innerText = chunk
    }
    console.log(stream);

    // Optionally, destroy the session when done
    session.destroy();
    console.log("session Destroyed")
  } else {
    console.error("Model is not available.");
  }
}



