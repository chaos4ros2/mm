import Head from 'next/head';
import Header from './Header';

const Layout = ({ children, meta }) => {
    const {title, description, name, icon } = meta;
    
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <link rel='icon' href={icon || '/favicon.ico'} />
            </Head>
            <main>
                <Header 
                    name={name}
                />
                {/*<Footer /> */}
                <main>{children}</main>
            </main>
        </div>
    ); 
};

export default Layout;
