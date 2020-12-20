import { getUser } from '@/lib/db';

export default async (req, res) => {
  //this token is not the vendure one
  const user = await getUser(req.headers.token);
  res.status(200).json({ user });
};
