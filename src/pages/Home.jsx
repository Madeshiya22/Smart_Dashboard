import React from "react";
import "../styles/Home.css";
export default function Home() {
  return (
    <div className="home">
      <div className="card-container">
        <Card title="Users" value="1,204" />
        <Card title="Revenue" value="$12,430" />
        <Card title="Performance" value="89%" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="card">
      <h4 className="card-title">{title}</h4>
      <h2 className="card-value">{value}</h2>
    </div>
  );
}