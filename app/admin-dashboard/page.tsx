// e.g., in /admin-dashboard/page.tsx
// 'use client';
// import { useAuth } from '@/context/AuthContext';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AdminDashboard() {
//   const { state } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!state.isAuthenticated || state.user?.role !== 'ADMIN') {
//       router.push('/auth/login');
//     }
//   }, [state, router]);

//   if (!state.isAuthenticated || state.user?.role !== 'ADMIN') {
//     return <div>Loading...</div>;
//   }

//   return <div>Admin Dashboard Content</div>;
// }


// app/admin-dashboard/page.tsx (wrap your admin content with ProtectedRoute)
import React from 'react'

const AdminDashboard = () => {
  return (
    <div>admin -page</div>
  )
}

export default AdminDashboard