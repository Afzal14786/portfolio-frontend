import { api } from '../lib/api';
import type { Certificate } from '../types/certificate';
import type { ApiResponse } from '../types/common';

export const CertificateService = {
  /**
   * Fetch all portfolio certificates
   */
  getCertificates: async (): Promise<ApiResponse<Certificate[]>> => {
    // Assuming standard public portfolio route mapping
    return api.get('/portfolio/certificates'); 
  },
  
  /**
   * Fetch a specific certificate by ID
   */
  getCertificateById: async (id: string): Promise<ApiResponse<Certificate>> => {
    return api.get(`/portfolio/certificates/${id}`);
  }
};