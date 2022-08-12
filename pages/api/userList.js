// import prisma from '../../lib/prisma';

// POST /api/userList
// Required fields in body: id, name
export default async function handle(req, res) {
    const user_list = await prisma.Employee.findMany({
        where: {
            delete_date: null,
        },
        select: {
            id: true,
            name: true,
            phone_number: true,
        }
    });
    res.status(200).json({message: 'Profile updated successfully'});
}
