import { api } from '../lib/api';
import type { CertificateFetchResponse } from '../types/certificate';

export const CertificateService = {
  /**
   * Fetch all active certificates for the public portfolio
   */
  getPublicCertificates: async (): Promise<CertificateFetchResponse> => {
    // This matches the pattern of your other public routes like '/portfolio/skills'
    return api.get('/portfolio/certificates');
  }
}