// lib/api/adminService.ts
import api from './axios';
import { EmployeeModel, ClientModel, WebResponseDTOListEmployeeDTO, WebResponseDTOEmployeeDTO, WebResponseDTOListClientDTO, WebResponseDTOClientDTO } from './types';

export const adminService = {
  async getAllEmployees(): Promise<WebResponseDTOListEmployeeDTO> {
    const response = await api.get('/web/api/v1/admin/emp/all');
    return response.data;
  },

  async getEmployeeById(empId: string): Promise<WebResponseDTOEmployeeDTO> {
    const response = await api.get(`/web/api/v1/admin/emp/${empId}`);
    return response.data;
  },

  async addEmployee(employee: EmployeeModel): Promise<any> {
    const params = new URLSearchParams();
    params.append('employeeModel', JSON.stringify(employee));
    const response = await api.post(`/web/api/v1/admin/add/employee?${params.toString()}`);
    return response.data;
  },

  async updateEmployee(empId: string, employee: EmployeeModel): Promise<any> {
    const params = new URLSearchParams();
    params.append('employeeModel', JSON.stringify(employee));
    const response = await api.put(`/web/api/v1/admin/updateemp/${empId}?${params.toString()}`);
    return response.data;
  },

  async getAllClients(): Promise<WebResponseDTOListClientDTO> {
    const response = await api.get('/web/api/v1/admin/client/all');
    return response.data;
  },

  async getClientById(clientId: string): Promise<WebResponseDTOClientDTO> {
    const response = await api.get(`/web/api/v1/admin/client/${clientId}`);
    return response.data;
  },

  async addClient(client: ClientModel): Promise<any> {
    const params = new URLSearchParams();
    params.append('clientModel', JSON.stringify(client));
    const response = await api.post(`/web/api/v1/admin/add/client?${params.toString()}`);
    return response.data;
  },

  async updateClient(clientId: string, client: ClientModel): Promise<any> {
    const params = new URLSearchParams();
    params.append('clientModel', JSON.stringify(client));
    const response = await api.put(`/web/api/v1/admin/updateclient/${clientId}?${params.toString()}`);
    return response.data;
  },
};