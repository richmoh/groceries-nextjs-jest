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
        case "POST":            
            if (!req.body.name) {
                return res.status(400).json({ error: 'Name is required' });
            }

            const item = await prisma.item.create({
                data: {
                    name: req.body.name,
                    groceryListId: Number(req.query.groceryListId),
                    isPurchased: false
                }
            });

            res.status(200).json({ item });
            break;
            
        default:
            res.setHeader("Allow", ["POST"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}