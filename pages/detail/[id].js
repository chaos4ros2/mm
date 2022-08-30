import Layout from '../../components/Layout'
import DetailBody from '../../components/body/DetailBody';
import { useRouter } from 'next/router'
import prisma from '../../lib/prisma';

export default function Information(props) {
    const router = useRouter()
    const { id } = router.query;

    return (
        <Layout
            meta={{
                title: '連絡事項詳細',
                description: '連絡事項詳細',
            }}
        >
            <DetailBody             
                data={{
                    information_detail: props.information_detail
                }} 
            />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    // 共通で使わないapiは直書き
    const id = context.query.id;

    // 参考：https://stackoverflow.com/questions/69857000/prisma-how-can-i-find-all-elements-that-match-an-id-list
    const data = await prisma.Information.findMany({
        where: {
            id: Number(id),
            delete_date: null,
        },
        select: {
            id: true,
            title: true,
            text: true,
            created_at: true,
            updated_at: true,
            facility: true,
            employee: true,
        },
    });

    const information_detail = JSON.parse(JSON.stringify(data));
    console.log('information_detail', information_detail);
    return {
        props: { information_detail }, // will be passed to the page component as props
    }
}