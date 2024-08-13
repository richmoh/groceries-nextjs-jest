import { NextApiRequest, NextApiResponse } from 'next';
import handler from './grocerylists';
import prisma from '@/lib/db';

jest.mock('@/lib/db', () => ({
    groceryList: {
        findMany: jest.fn(),
        create: jest.fn(),
    },
}));

describe('GroceryLists API Handler', () => {
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

    it('should return grocery lists on GET', async () => {
        const mockGroceryLists = [{ id: 1, name: 'Test List', items: [] }];
        (prisma.groceryList.findMany as jest.Mock).mockResolvedValue(mockGroceryLists);

        req.method = 'GET';

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockGroceryLists);
    });

    it('should create a grocery list on POST', async () => {
        const mockGroceryList = { id: 1, name: 'New List' };
        (prisma.groceryList.create as jest.Mock).mockResolvedValue(mockGroceryList);

        req.method = 'POST';
        req.body = { name: 'New List' };

        await handler(req as NextApiRequest, res as NextApiResponse);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ groceryList: mockGroceryList });
    });
});