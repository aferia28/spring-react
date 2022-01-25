import React, { Fragment, useState, useEffect } from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import { UserList } from "./components/UserList";
import { Profile } from './components/Profile'
import { Layout } from "./components/Layout"

export function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="profile" element={<Profile />} />
        <Route path="timeline" element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default App;
