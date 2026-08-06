import ListingsTable from "@/app/_components/ListingTable/page";

function page() {
  return <ListingsTable listings={[]} addNewHref="/dashboard/add-listing" />;
}

export default page;
