import Sidebar from '@/components/manager/Sidebar';
import Header from '@/components/manager/Header';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={['MANAGER']}>
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
