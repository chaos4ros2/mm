import Layout from '../../components/Layout'
import InformationBody from '../../components/body/InformationBody';
import { useRouter } from 'next/router'
import prisma from '../../lib/prisma';

export default function Information(props) {
    const router = useRouter()
    const { id, name } = router.query;

    return (
        <Layout
            meta={{
                title: '連絡事項リスト',
                description: '連絡事項リスト',
                name: name,
            }}
        >
            <InformationBody             
                data={{
                    information_list: props.information_list,
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

    // 月初と月末日付
    // https://qiita.com/su_mi/items/2f086817a4dd0b05f304
    const date = new Date();
    const bm = context.query.start ? new Date(`${context.query.start} 00:00:00`) : new Date(date.setDate(1)); // beginning of the month
    date.setMonth(date.getMonth() + 1);
    const em = context.query.end ? new Date(`${context.query.end} 23:59:59`)  : new Date(date.setDate(0));

    // 参考：https://stackoverflow.com/questions/69857000/prisma-how-can-i-find-all-elements-that-match-an-id-list
    const data = await prisma.Information.findMany({
        where: {
            facility_id: Number(id),
            delete_date: null,
            // https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#examples-41
            created_at: {
                gte: bm,
                lte: em,
            },
        },
        select: {
            id: true,
            title: true,
            created_at: true,
            employee: true,
        },
        // https://www.prisma.io/docs/concepts/components/prisma-client/filtering-and-sorting
        orderBy: [
            {
                employee_id: 'asc',
            },
        ],
    });

    const information_list = JSON.parse(JSON.stringify(data));

    return {
        props: { information_list }, // will be passed to the page component as props
    }
}