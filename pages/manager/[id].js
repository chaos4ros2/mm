import Layout from '../../components/Layout'
import ManagerBody from '../../components/body/ManagerBody';
import { useRouter } from 'next/router'

export default function Home(props) {
    const router = useRouter()
    const { id, name } = router.query;

    return (
        <Layout
            meta={{
                title: '施設管理者名簿',
                description: '施設管理者管理',
                name: name,
            }}
        >
            <ManagerBody             
                data={{
                    id: id,
                    name: name,
                }} 
            />
        </Layout>
    )
}