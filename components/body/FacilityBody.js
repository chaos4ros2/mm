import {useEffect, useState} from 'react';

const FacilityBody = ( {} ) => {
    // 施設リスト 
    // Todo: react queryで書き換える
    const [ facilityList, setFacilityList ] = useState([]);

    useEffect(() => {
        // 施設リスト取得
        const getFacilityList = async() => {
            const res = await fetch(`http://localhost:3000/api/facilityList`);
            // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
            const facility_list = await res.json();
            setFacilityList(facility_list);
        }
        getFacilityList();
    }, []);

    return (
        <div className="w-auto grow flex flex-col items-center text-center">
            {facilityList?.map((facility) => 
                <a 
                    href="#" 
                    className="w-3/4 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                    key={facility.id}
                >
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{facility.name}</h5>
                </a>
            )}
        </div>
    ); 
};

export default FacilityBody;
