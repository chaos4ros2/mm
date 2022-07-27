import Layout from '../../components/Layout'
import LocationBody from '../../components/body/LocationBody';
import { useRouter } from 'next/router'

export default function Home() {
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
            <LocationBody             
                id={id} 
            />
        </Layout>
    )
}