import { NextApiRequest, NextApiResponse } from 'next';

let userData = {
  id: 1,
  name: 'John Cletus N. Blas',
  email: 'johnusblas@gmail.com',
  bio: '3rd Year Computer Science Student',
  perfume: [
    {
      brand: "Dior",
      model: "Sauvage"
    },
    {
      brand: "Versace",
      model: "Eros"
    }
  ]
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(userData);
  } else if (req.method === 'PUT') {
    const { id, name, email, bio, perfume } = req.body;
    if (!id || !name || !email || !bio || !perfume) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      userData = { id, name, email, bio, perfume };
      res.status(200).json(userData);
    }
  } else if (req.method === 'POST') {
    const { name, email, bio, perfume } = req.body;
    if (!name || !email || !bio || !perfume) {
      res.status(400).json({ error: "Missing required fields" });
    } else {
      const id = userData.id + 1;
      userData = { id, name, email, bio, perfume };
      res.status(201).json(userData);
    }
  } else if (req.method === 'DELETE') {
    userData = {
      id: 1,
      name: '',
      email: '',
      bio: '',
      perfume: []
    };
    res.status(200).end('User data deleted successfully');
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
