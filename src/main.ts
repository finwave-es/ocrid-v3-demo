import { OcrId, EventType, Envs, EventTypeUserFeedback } from 'fw-ocrid';

let ocrid: OcrId | null = null;
let processId: string | null = null;

const initializeButton = document.getElementById("initializeButton") as HTMLButtonElement;
const tokenInput = document.getElementById("tokenInput") as HTMLInputElement;
const statusDiv = document.getElementById("status") as HTMLElement;
const tokenInputContainer = document.getElementById("tokenInputContainer") as HTMLElement;
const controlsDiv = document.getElementById("controls") as HTMLElement;
const videoContainer = document.getElementById("videoContainer") as HTMLElement;
const resultDiv = document.getElementById("result") as HTMLElement;
const startButton = document.getElementById("startButton") as HTMLButtonElement;
const restartButton = document.getElementById("restartButton") as HTMLButtonElement;

// Initialize OCR when the button is clicked
initializeButton.addEventListener("click", () => {
  const token = tokenInput.value.trim();

  if (!token) {
    statusDiv.textContent = "Error: Token is required.";
    return;
  }

  try {
    ocrid = new OcrId(token, Envs.PRE3);

    // Subscribe to feedback events
    ocrid.events(EventType.USER_FEEDBACK).subscribe((feedback: any) => {
      console.log("Feedback:", feedback);
      switch (feedback) {
        case EventTypeUserFeedback.SHOW_DOCUMENT_FRONT_SIDE:
          console.log("Displaying document front side.");
          break;
        case EventTypeUserFeedback.SHOW_DOCUMENT_REVERSE_SIDE:
          console.log("Displaying document back side.");
          break;
        case EventTypeUserFeedback.DOCUMENT_FRONT_SIDE_COMPLETED:
          console.log("Document front side scanned successfully.");
          break;
        case EventTypeUserFeedback.PROCESS_FAILED_DUE_ANALYSIS_ERROR:
          console.error("Process failed due to an analysis error.");
          ocrid!.restart();
          break;
        case EventTypeUserFeedback.PROCESS_FINISHED:
          console.log("Scanning process finished.");
          break;
        default:
          console.log("Feedback received:", feedback);
      }
    });

    // Subscribe to other events
    ocrid.events(EventType.RESULT).subscribe((result: any) => {
      console.log("Scan completed:", result);
      // here get the result from API with processId
      console.log('ID: ' + processId);
      ocrid!.close();
    });

    ocrid.events(EventType.ERROR).subscribe((error: any) => {
      console.error("An error occurred:", error);
    });

    statusDiv.textContent = "OCR initialized successfully.";
    tokenInputContainer.style.display = "none";
    controlsDiv.style.display = "block";

    console.log("OCR initialized successfully.");
  } catch (error) {
    console.error("Error initializing OCR:", error);
    statusDiv.textContent = "Error initializing OCR.";
  }
});

// Start the video stream
startButton.addEventListener("click", () => {
  if (!ocrid) {
    statusDiv.textContent = "Error: OCR not initialized.";
    return;
  }

  ocrid.startStream(videoContainer)
    .then((id) => {
      console.log("Stream started.");
      console.log('ID: ' + id);
      processId = id as string ?? null;
      statusDiv.textContent = "Stream started.";
    })
    .catch((err: any) => {
      console.error("Error starting stream:", err);
      statusDiv.textContent = `Error: ${err}`;
    });
});

// Restart the OCR process
restartButton.addEventListener("click", () => {
  if (!ocrid) {
    statusDiv.textContent = "Error: OCR not initialized.";
    return;
  }

  ocrid.restart()
    .then(() => {
      console.log("Process restarted.");
      statusDiv.textContent = "Process restarted.";
      resultDiv.textContent = "";
    })
    .catch((err: any) => {
      console.error("Error restarting process:", err);
      statusDiv.textContent = `Error: ${err}`;
    });
});
