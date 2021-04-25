import { NextFunction, Request, Response } from 'express';
import { indexedIps } from '../globals'

class IpController {
  public checkIps = async ({ body }: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const blacklisted = {}

        for (const entry of body.ipList) {
          if (indexedIps.indexed[entry] && !blacklisted[entry]) {
            blacklisted[entry] = indexedIps.indexed[entry]
          }
        }
        res.status(200).json({ blacklisted, message: 'success' });

      } catch (error) {
        console.log("ERROR", error)
        next(error);
      }
    }
}

export default IpController;
