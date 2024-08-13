import { NextApiRequest, NextApiResponse } from 'next';
import handler from './item';
import prisma from '@/lib/db';

jest.mock('@/lib/db', () => ({
    item: {
        create: jest.fn(),
    },
}));

describe('Items API Handler', () => {
    let req: Partial<NextApiRequest>;
    let res: Partial<NextApiResponse>;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            setHeader: jest.fn(),
            end: jest.fn(),
        };

        jest.clearAllMocks();
    });

    it('should create an item on POST', async () => {
        const mockItem = { id: 1, name: '1 Apple', groceryListId: 1};
        (prisma.item.create as jest.Mock).mockResolvedValue(mockItem);

        req.method = 'POST';
        req.query = { groceryListId: '1' };
        req.body = { name: '1 Apple' };

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(prisma.item.create).toHaveBeenCalledWith({
            data: {
                name: '1 Apple',
                groceryListId: 1,
                isPurchased: false
            }
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ item: mockItem });
    });

    it('should return an error without a name on POST', async () => {
        req.method = 'POST';
        req.query = { groceryListId: '1' };
        req.body = {};

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(prisma.item.create).not.toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'Name is required' });
    });
});