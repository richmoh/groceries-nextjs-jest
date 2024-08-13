import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from 'lib/db';

export const getGroceryLists = async () => {
    return await prisma.groceryList.findMany({
        include: {
            items: true
        }
    });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    
    switch (method) {
        case "GET":

            const groceryLists = await getGroceryLists();
            res.status(200).json(groceryLists);
            
            break;

        case "POST":
            
            if (!req.body.name) {
                return res.status(400).json({ error: 'Name is required' });
            }

            const groceryList = await prisma.groceryList.create({
                data: {
                    name: req.body.name,
                }
            });

            res.status(200).json({ groceryList });
            break;
            
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}