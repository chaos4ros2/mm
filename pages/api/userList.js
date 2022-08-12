// import prisma from '../../lib/prisma';

// POST /api/userList
// Required fields in body: id, name
export default async function handle(req, res) {
    res.status(200).json({message: 'Profile updated successfully'});
}
