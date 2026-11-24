import AdminGate from "@/app/admin/admin-gate";
import WorksOwnerBriefcase from "@/components/WorksOwnerBriefcase";
import "@/app/works-briefcase.css";

export default function AdminPage(){
  return <AdminGate><WorksOwnerBriefcase /></AdminGate>;
}
