import prisma from '../../lib/prisma';

// POST /api/mangerInfo
// Required fields in body: id, name, gender, birth, phone_number, position
// info_1, info_2, info_3, info_4, info_5, note, Facility
export default async function handle(req, res) {
    const { id } = req.query;

    const manager_info = await prisma.Manager.findFirst({
        where: {
            delete_date: null,
            id: Number(id),
        },
        select: {
            id: true,
            name: true,
            gender: true,
            phone_number: true,
            position: true,
            address: true,
            birth: true,
            info_1: true,
            info_2: true,
            info_3: true,
            info_4: true,
            info_5: true,
            note: true,
            facility: true,
        }
    });
    console.log(manager_info);
    res.status(200).json(manager_info);
}