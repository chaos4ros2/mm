import prisma from '../../lib/prisma';

// POST /api/facilityList
// Required fields in body: id, name, address
export default async function handle(req, res) {
    const facility_list = await prisma.Facility.findMany({
        where: {
            delete_date: null,
        },
        select: {
            id: true,
            name: true,
            address: true
        }
    });
    res.json(facility_list);
}