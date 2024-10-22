import OtpModel from '@/models/otp.model';
import { IOtpSchema } from '@/interfaces/user.interface';

class OtpDAO {
  public async findValidOtp(userId: string) {
    return await OtpModel.findOne({
      user: userId,
      isExpired: false,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });
  }

  public async createOtp(data: Partial<IOtpSchema>) {
    return await OtpModel.create(data);
  }

  public async markOtpAsUsed(otpId: string) {
    return await OtpModel.findByIdAndUpdate(otpId, { isUsed: true });
  }

  public async markOtpAsExpired(otpId: string) {
    return await OtpModel.findByIdAndUpdate(otpId, { isExpired: true });
  }
}

export default OtpDAO;
