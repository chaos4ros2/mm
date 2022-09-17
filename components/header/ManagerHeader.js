import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const ManagerHeader = ( {} ) => {
    const router = useRouter();
    const { id, name } = router.query;
    // const {title, description, icon } = meta;

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-44 font-semibold text-lg text-white`}>{name}</div>
            </div>
        </div>
    ); 
};

export default ManagerHeader;