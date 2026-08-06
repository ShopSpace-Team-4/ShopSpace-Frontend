import ListingsTable from "@/app/_components/ListingTable/page";
import Sidebar from "@/shared/Sidebar/Sidebar";
function page() {
  return (
    <div className="flex">
      <Sidebar />
      <ListingsTable listings={[]} />
    </div>
  )
}

export default page