import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const DetailBody = ( { data } ) => {
    const { facility_list } = data;

    const router = useRouter()
    const { name } = router.query;

    return (
        <div>
            <div className="w-auto text-center">
                <div className="mt-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">名前　{name}</div>
            </div>

            <div className="w-auto grow flex flex-col items-center text-center">
                {facility_list?.map((facility) => 
                    <a 
                        href={`/facility/${facility.id}?name=${facility.name}`}  
                        className="w-3/4 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                        key={facility.id}
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{facility.name}</h5>
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{facility.address}</p>
                    </a>
                )}
            </div>
        </div>
    ); 
};

export default DetailBody;