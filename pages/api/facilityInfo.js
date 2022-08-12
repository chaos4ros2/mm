import prisma from '../../lib/prisma';

// POST /api/facilityList
// Required fields in body: id, name, address
export default async function handle(req, res) {
    const { id } = req.query

    const facility_detail = await prisma.Facility.findFirst({
        where: {
            delete_date: null,
            id: Number(id),
        },
        select: {
            id: true,
            name: true,
            address: true,
            Manager: true,
            Workplace: true,
        }
    });
    res.status(200).json(facility_detail);
}