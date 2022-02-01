import React, { useState, useEffect, useRef } from "react";

import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <div>Please come back later!</div>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export default ErrorFallback;
