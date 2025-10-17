// // lib/api/employeeService.ts
// import api from './axios';
// import { TimeSheetModel, WebResponseDTOTimeSheet, TimeSheet } from './types';

// export const employeeService = {
//   async registerTimeSheet(timeSheetModel: TimeSheetModel): Promise<TimeSheet> {
//     const response = await api.post<WebResponseDTOTimeSheet>('/employee/timesheet/register', timeSheetModel);
//     if (response.data.flag) {
//       return response.data.response;
//     }
//     throw new Error(response.data.message || 'Failed to register timesheet');
//   },

//   // 👇 NEW FUNCTION: Fetch all timesheets for the logged-in employee
//   async getEmployeeTimeSheets(): Promise<TimeSheet[]> {
//     try {
//       const response = await api.get<WebResponseDTOTimeSheet>('/employee/timesheet/all');
//       if (response.data.flag) {
//         return response.data.response as unknown as TimeSheet[];
//       }
//       throw new Error(response.data.message || 'Failed to fetch timesheets');
//     } catch (error: any) {
//       throw new Error(error.response?.data?.message || 'Failed to load timesheets');
//     }
//   },
// };


// // lib/api/employeeService.ts
// import api from './axios';
// import { WebResponseDTOTimeSheet, WebResponseDTOListTimesheet, TimeSheetModel } from "./types";


// export const employeeService = {
//   /** 🔹 Register or update a timesheet entry */
//   async registerTimeSheet(data: TimeSheetModel): Promise<WebResponseDTOTimeSheet> {
//     const response = await api.post<WebResponseDTOTimeSheet>(
//       '/web/api/v1/employee/timesheet/register',
//       data
//     );
//     return response.data;
//   },

//   /** 🔹 Fetch all timesheets for a given employee */
//   async viewTimeSheet(employeeId?: string): Promise<WebResponseDTOListTimesheet> {
//     const response = await api.get<WebResponseDTOListTimesheet>(
//       '/web/api/v1/employee/view/timesheet',
//       {
//         params: { employeeId },
//       }
//     );
//     return response.data;
//   },
// };



import api from './axios';
import { TimeSheetModel, WebResponseDTOTimeSheet, WebResponseDTOListTimesheet } from './types';

export const employeeService = {
  // Fetch list of timesheets
  viewTimeSheet: async (userId?: string) => {
    const res = await api.get<WebResponseDTOListTimesheet>('/employee/view/timesheet', {
      params: { userId },
    });
    return res.data; // response is WebResponseDTOListTimesheet
  },

  // Register a new timesheet (only needs TimeSheetModel)
  registerTimeSheet: async (timeSheet: TimeSheetModel) => {
    const res = await api.post<WebResponseDTOTimeSheet>('/employee/timesheet/register', timeSheet);
    return res.data; // response is WebResponseDTOTimeSheet
  },
};
