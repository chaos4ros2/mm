import Layout from '../../components/Layout'
import AffiliationBody from '../../components/body/AffiliationBody';
import { useRouter } from 'next/router'

export default function Home(props) {
    const router = useRouter()
    const { id, name } = router.query;

    return (
        <Layout
            meta={{
                title: '所属リスト',
                description: '所属リスト',
                name: name,
            }}
        >
            <AffiliationBody             
                data={{
                    facility_list: props.facility_list,
                }} 
            />
        </Layout>
    )
}

export async function getServerSideProps(context) {
    // 直接prismaのコードを書くのができるが、すでにapiで同じことを使用していたためapi呼び出しを使う
    // pageごとにprismaで取得するコードを書くより、統一のapiを使ったほうがスマートだが、どういう値を取れるのか
    // をコメントで書いたほうがいい。（typeスクリプトなら解決かも）
    // const user_list = await prisma.Employee.findMany({
    //     where: {
    //         delete_date: null,
    //     },
    //     select: {
    //         id: true,
    //         name: true,
    //         phone_number: true,
    //     }
    // });
    const id = context.query.id;
    const hostname = context.req.headers.host;

    const res = await fetch(`http://${hostname}/api/memberInfo?id=${id}`);
    // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
    const member_info = await res.json();

    // 施設idの配列を作成
    const facility_id_array = [];
    member_info.Workplace.forEach(workplace => {
        facility_id_array.push(workplace.facility_id);
    });

    // 参考：https://stackoverflow.com/questions/69857000/prisma-how-can-i-find-all-elements-that-match-an-id-list
    const facility_list = await prisma.Facility.findMany({
        where: {
            id: { in: facility_id_array },
            delete_date: null,
        },
        select: {
            id: true,
            name: true,
            address: true
        }
    });

    return {
        props: { facility_list }, // will be passed to the page component as props
    }
}