import prisma from '../../lib/prisma';

// POST /api/user
// Required fields in body: name, email
export default async function handle(req, res) {
    const user_list = await prisma.Employee.findMany({
        where: {
            delete_date: null,
        },
        select: {
            id: true,
            name: true,
        }
    });
    res.json(user_list);
}
