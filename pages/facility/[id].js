import Layout from '../../components/Layout'
import FacilityBody from '../../components/body/FacilityBody';
import { useRouter } from 'next/router'

export default function Home() {
    const router = useRouter()
    const { id } = router.query;

    return (
        <Layout
            meta={{
                title: 'メンバー名簿',
                description: 'メンバー管理',
            }}
        >
            <FacilityBody             
                id={id} 
            />
        </Layout>
    )
}