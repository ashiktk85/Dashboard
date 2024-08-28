import React, { Suspense, lazy } from "react";
import "./index.css";
const LazyDashboard = lazy(() => import("./pages/Dashboard"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyDashboard />
    </Suspense>
  );
}

export default App;
