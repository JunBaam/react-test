import React from "react";
import ReactDOM from "react-dom/client";
import PageNation from "./results/PageNation";
import FormResult from "./results/FormResult";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <PageNation totalItems={9} itemsPerPage={3} />{" "} */}
    <FormResult />
  </React.StrictMode>
);
