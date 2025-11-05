import Sidebar from '@/components/employee/Sidebar';
import Header from '@/components/employee/Header';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['EMPLOYEE']}>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-4 bg-gray-50">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
