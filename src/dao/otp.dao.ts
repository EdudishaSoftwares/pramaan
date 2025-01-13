import OtpModel from '@/models/otp.model';
import { IOtpSchema } from '@/interfaces/user.interface';

class OtpDAO {
  // Model
  private otpModel = OtpModel;

  /**
   * Finds Valid OTP based on the UserId.
   * @param {string} userId - The userId is MongoId od UserDao used for ref.
   */
  public findValidOtp = async (userId: string) => {
    return await this.otpModel.findOne({
      user: userId,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    }).lean();
  };

  /**
   * Creates OTP record.
   * @param {Partial<IOtpSchema>} data - The data is payload to create OTP document.
   */
  public createOtp = async (data: Partial<IOtpSchema>) => {
    return await this.otpModel.create(data);
  };

  /**
   *Used to mark OTP as used.
   * @param {Partial<string>} otpId - The otpId is MongoId.
   */
  public markOtpAsUsed = async (otpId: string) => {
    return await this.otpModel.findByIdAndUpdate(otpId, { isUsed: true });
  };
}

export default OtpDAO;
