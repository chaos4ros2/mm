import Layout from '../../components/Layout'
import FacilityBody from '../../components/body/FacilityBody';
import { useRouter } from 'next/router'

export default function Home(props) {
    const router = useRouter()
    const { id, name } = router.query;

    return (
        <Layout
            meta={{
                title: 'メンバー名簿',
                description: 'メンバー管理',
                name: name,
            }}
        >
            <FacilityBody             
                data={{
                    id: id,
                    user_list: props.user_list,
                }} 
            />
        </Layout>
    )
}

export async function getServerSideProps() {
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
    const res = await fetch(`http://localhost:3000/api/userList`);
    // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
    const user_list = await res.json();
    return {
      props: {user_list}, // will be passed to the page component as props
    }
}