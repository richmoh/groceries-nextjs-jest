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
        case "PATCH":

            let data: {
                isPurchased?: boolean;
            } = {};

            if (req.body.isPurchased !== undefined) {
                data['isPurchased'] = req.body.isPurchased;
            }

            if (Object.keys(data).length === 0) {
                return res.status(400).json({ error: 'No data has been submitted' });
            }

            const updatedItem = await prisma.item.update({
                where: {
                    id: Number(req.query.itemId)
                },
                data: data
            });

            res.status(200).json({ item: updatedItem });
            break;
            
        default:
            res.setHeader("Allow", ["PATCH"]);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}