export interface CertificateImage {
  public_id: string;
  url: string;
}

export interface Certificate {
  _id: string;
  courseName: string;
  instituteName: string;
  teacherName?: string;
  teacherImage?: string | CertificateImage;
  skills?: string[];
  certificateImage: string | CertificateImage;
}

export interface CertificateFetchResponse {
  success: boolean;
  certificates?: Certificate[];
  data?: {
    certificates?: Certificate[];
  };
}