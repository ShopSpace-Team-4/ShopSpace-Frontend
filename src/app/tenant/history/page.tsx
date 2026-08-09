"use client"
import LeaseHistoryList from "../../../shared/Leasehistorylist/Leasehistorylist";

const leases = [
  {
    id: "1",
    imageUrl: "/images/boutique-space.jpg",
    title: "Boutique Space – Granada Mall",
    period: "Jan 2024 – Present",
    price: 55000,
    currency: "LE",
    pricePeriod: "yr",
    status: "active" as const,
  },
  {
    id: "2",
    imageUrl: "/images/tech-hub.jpg",
    title: "Tech Hub Office Space",
    period: "Jun 2023 – Dec 2023",
    price: 95000,
    currency: "LE",
    pricePeriod: "yr",
    status: "ended" as const,
  },
];

function Page() {
  return (
          <>
          <h1 className="text-2xl font-semibold text-gray-900">Lease History</h1>
      <div className="p-6">
      <LeaseHistoryList
        leases={leases}
        onContractClick={(lease) => console.log("View contract:", lease.id)}
      />
    </div>
    </>
  );
}

export default Page;