import React, { lazy, Suspense } from "react";
import "./styles.css";
const FirstApp = lazy(() => import("FIRST_APP/app"));
const MICRO = lazy(() => import("MICRO_1/App"));

const App = () => {
  const [name, setName] = React.useState(null);

  return (
    <div className="App">
      <h1>This is third app</h1>
      {/* <Contoh/> */}
      <h2>Micro host app is integrated here</h2>
      {name ? <p>Your name is: {name}</p> : null}
      <div>
        <Suspense fallback={<span>Loading...</span>}>
          <FirstApp onChange={(e) => setName(e.target.value)} />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<span>Loading...</span>}>
          <MICRO />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
