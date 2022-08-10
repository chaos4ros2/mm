import Layout from '../../components/Layout'
import MemberBody from '../../components/body/MemberBody';
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
            <MemberBody             
                data={{
                    id: id,
                    name: name,
                }} 
            />
        </Layout>
    )
}