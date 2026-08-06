
import AddListingForm from "@/Compontents/AddListingForm/AddListingForm";
import DashboardNav from "@/shared/DashboardNav/DashboardNav";
import Sidebar from "@/shared/Sidebar/Sidebar";

export default function AddListingPage() {
  return (
   <div className="flex min-h-screen w-full flex-col bg-(--bg-base)">
  <DashboardNav />

  <div className="flex flex-1 items-stretch">
    <Sidebar active="add-listing" mode="landlord" />
    <main className="flex-1 p-7">
      <AddListingForm />
    </main>
  </div>
</div>
  );
}