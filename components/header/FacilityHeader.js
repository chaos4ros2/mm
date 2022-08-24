import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import CalendarMonth from '@mui/icons-material/CalendarMonth';

const FacilityHeader = ( { name } ) => {
    const router = useRouter();
    const { id, name } = router.query;
    // const {title, description, icon } = meta;

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-32 font-semibold text-lg text-white`}>{name}</div>
            </div>
            <a href={`/information/${id}`} target='_blank' rel='noreferrer'>
                <CalendarMonth 
                    className="text-white mr-4 cursor-pointer"
                />
            </a>
        </div>
    ); 
};

export default FacilityHeader;
