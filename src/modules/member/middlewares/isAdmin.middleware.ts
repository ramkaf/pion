import { Request, Response, NextFunction } from 'express';
import { Role } from '../models/member.model'; 

const isAdmin = (req: Request, res: Response, next: NextFunction):any=> {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const user = req.user as { role: Role }; 
  if (user.role === Role.Admin) {
    return next(); 
  }

  return res.status(403).json({ message: 'Forbidden: Admin access required' });
};

export default isAdmin;


