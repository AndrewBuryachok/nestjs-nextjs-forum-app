import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class NickThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const nick = req.body?.nick;
    if (!nick) {
      return req.ips.length ? req.ips[0] : req.ip;
    }
    return nick;
  }
}
