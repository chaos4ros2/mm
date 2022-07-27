import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

const HomeBody = ( {} ) => {
    // 地域リスト 
    // Todo: react queryで書き換える
    const [ locationList, setLocationList ] = useState([]);

    useEffect(() => {
        // 地域リスト取得
        const getLocationList = async() => {
            const res = await fetch(`http://localhost:3000/api/locationList`);
            // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
            const location_list = await res.json();
            setLocationList(location_list);
        }
        getLocationList();
    }, []);

    return (
        <div className="w-auto grow flex flex-col items-center text-center">
            {locationList?.map((location) => 
                <a 
                    href={`./location/${location.id}?name=${location.name}`} 
                    className="w-3/4 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                    key={location.id}
                >
                    <SearchIcon 
                        className="cursor-pointer flex relative top-7"
                    />
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{location.name}</h5>
                </a>
            )}
        </div>
    ); 
};

export default HomeBody;
