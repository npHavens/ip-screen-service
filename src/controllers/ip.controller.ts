import { NextFunction, Request, Response } from 'express';
import { indexedIps } from '../globals'

class IpController {
  public checkIps = async ({ body }: Request, res: Response): Promise<void> => {
    if (body.ipList || !body.ipList.length) {
      res.status(400).send('At least 1 IP address must be included in body of request')
    } else {
      const blacklisted = {}

      for (const entry of body.ipList) {
        if (indexedIps.indexed[entry] && !blacklisted[entry]) {
          blacklisted[entry] = indexedIps.indexed[entry]
        }
      }

      res.status(200).json({ blacklisted, message: 'success' });
    }
  }
}

export default IpController;
