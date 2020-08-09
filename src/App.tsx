import React from "react";
import "./App.css";
import { AppRouter } from "./domain/app.router";
import { AuthContextProvider } from "./context";

function App() {
  return (
    <AuthContextProvider>
      <AppRouter />
    </AuthContextProvider>
  );
}

export default App;
