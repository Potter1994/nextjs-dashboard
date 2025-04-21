import { fetchRevenue } from "@/app/lib/data";
import React from "react";

async function Page() {
  const revenue = await fetchRevenue();
  return <div>Customers!!</div>;
}

export default Page;
