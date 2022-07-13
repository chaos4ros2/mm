import Head from 'next/head';
import Header from './Header';

const Layout = ({ children, meta }) => {
    const {title, description, icon } = meta;
    
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <link rel='icon' href={icon || '/favicon.ico'} />
            </Head>
            <main>
                <Header />
                {/*<Footer /> */}
                <main>{children}</main>
            </main>
        </div>
    ); 
};

export default Layout;
