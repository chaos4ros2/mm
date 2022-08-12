import prisma from '../../lib/prisma';

// POST /api/locationList
// Required fields in body: id, name, display_order
export default async function handle(req, res) {
    const location_list = await prisma.Prefecture.findMany({
        where: {
            display_flag: true,
        },
        select: {
            id: true,
            name: true,
            display_order: true
        }
    });
    res.status(200).json(location_list);
}