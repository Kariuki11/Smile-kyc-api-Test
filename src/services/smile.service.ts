import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

interface KYCRequest {
  firstName: string;
  lastName: string;
  idType: 'NATIONAL_ID' | 'PASSPORT' | 'DRIVERS_LICENSE' | 'VOTER_ID';
  idNumber: string;
  country: string;
  phoneNumber: string;
}

export class SmileService {
  private readonly apiUrl = 'https://testapi.smileidentity.com/v2/verify_async';
  private readonly apiKey = process.env.SMILE_API_KEY as string;
  private readonly partnerId = process.env.SMILE_PARTNER_ID as string;
  private readonly callbackUrl = process.env.CALLBACK_URL as string;

  async verifyUser(data: KYCRequest): Promise<any> {
    const requestBody = {
      partner_id: this.partnerId,
      first_name: data.firstName,
      last_name: data.lastName,
      id_type: data.idType,
      id_number: data.idNumber,
      country: data.country,
      phone_number: data.phoneNumber,
      callback_url: this.callbackUrl,
    };

    try {
      const response = await axios.post(this.apiUrl, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.apiKey,
        },
      });

      return response.data;
    } catch (error: any) {
      throw new Error(`Smile API error: ${error.response?.data?.message || error.message}`);
    }
  }
}