import Layout from '../../components/Layout'
import FacilityBody from '../../components/body/FacilityBody';

export default function Home() {
    return (
        <Layout
            meta={{
                title: 'メンバー名簿',
                description: 'メンバー管理',
            }}
        >
            <FacilityBody />
        </Layout>
    )
}