"use client";
import { useEffect, useState } from "react";
import Request from "../../../shared/Request/Request";

function Page() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("/api/tenant/requests")
      .then((res) => res.json())
      .then(setRequests);
  }, []);

  return (
    <div className="p-6">
      <Request requests={requests} />
    </div>
  );
}

export default Page;