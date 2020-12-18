import { getUser } from '@/lib/db';

export default async (req, res) => {
  const user = await getUser(req.headers.token);
  res.status(200).json({ user });
};
