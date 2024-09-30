import TicketFeature from "../../features/Ticket/Ticket.feature";
import DashboardFeature from "../../features/Dashboard/Dashboard.feature";
import "./Home.page.css";
import { useCustomInvoicesState } from "../../app/stores/custom_invoices_store";
function HomePage() {
  const {
    custom_invoices: { records },
  } = useCustomInvoicesState((state) => state);

  const outstanding_invoice = records.filter((invoice) => invoice.state === 0).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  const pending_invoice = records.filter((invoice) => invoice.state === 1).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  return (
    <>
      <DashboardFeature records={records} />
      <TicketFeature invoice={outstanding_invoice} title="Outstanding Invoices" />
      <TicketFeature invoice={pending_invoice} title="Payment Pending Invoices" />
    </>
  );
}

export default HomePage;
