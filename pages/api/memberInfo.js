import prisma from '../../lib/prisma';

// POST /api/memberInfo
// Required fields in body: id, name, gender, emergency_contact, birth, 
// info_1, info_2, info_3, info_4, info_5, note, Workplace
export default async function handle(req, res) {
    const { id } = req.query

    const member_info = await prisma.Employee.findFirst({
        where: {
            delete_date: null,
            id: Number(id),
        },
        select: {
            id: true,
            name: true,
            gender: true,
            emergency_contact: true,
            birth: true,
            info_1: true,
            info_2: true,
            info_3: true,
            info_4: true,
            info_5: true,
            note: true,
            Workplace: true,
        }
    });
    res.json(member_info);
}