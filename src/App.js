import "./App.css";
import React, { useEffect } from 'react'
import ChatGpt from "./components/chat-gpt";

import { app } from "./firebase";
import { getApps, getApp } from "firebase/app";

function Layout({ children }) {
  return (
    <section className="flex flex-col h-screen">{children}</section>
  );
}

function App() {

  useEffect(() => {
    let firebaseApp;
    if (!getApps().length) {
      firebaseApp = app;
    } else {
      firebaseApp = getApp(); // if already initialized, use that one
    }
  }, [])

  return (
    <Layout>
      <div className="mx-auto">
        <ChatGpt />
      </div>
    </Layout>
  );
}

export default App;
