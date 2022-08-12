import prisma from '../../lib/prisma';

// POST /api/facilityList
// Required fields in body: id, name, address
export default async function handle(req, res) {
    const { id } = req.query

    const facility_list = await prisma.Facility.findMany({
        where: {
            delete_date: null,
            prefecture_id: Number(id),
        },
        select: {
            id: true,
            name: true,
            address: true
        }
    });
    res.status(200).json(facility_list);
}