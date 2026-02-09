/**
 * Lightweight structured logging for gateway operations.
 * Outputs to stdout/stderr — captured by container runtime in production.
 */

function timestamp(): string {
  return new Date().toISOString();
}

export function logSubmissionRequest(
  documentType: string,
  documentCount: number,
  taxpayerTIN?: string
) {
  console.log(
    JSON.stringify({
      level: "info",
      timestamp: timestamp(),
      event: "submission_request",
      documentType,
      documentCount,
      taxpayerTIN: taxpayerTIN ?? "self",
    })
  );
}

export function logSubmissionResponse(
  documentType: string,
  result: {
    submissionUID?: string;
    acceptedDocuments?: unknown[];
    rejectedDocuments?: unknown[];
  }
) {
  console.log(
    JSON.stringify({
      level: "info",
      timestamp: timestamp(),
      event: "submission_response",
      documentType,
      submissionUID: result.submissionUID,
      accepted: result.acceptedDocuments?.length ?? 0,
      rejected: result.rejectedDocuments?.length ?? 0,
    })
  );
}

export function logSubmissionError(
  documentType: string,
  error: unknown,
  taxpayerTIN?: string
) {
  console.error(
    JSON.stringify({
      level: "error",
      timestamp: timestamp(),
      event: "submission_error",
      documentType,
      taxpayerTIN: taxpayerTIN ?? "self",
      error:
        error instanceof Error
          ? { message: error.message, name: error.name }
          : String(error),
    })
  );
}
