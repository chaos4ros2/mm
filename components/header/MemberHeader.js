import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'
import ListAlt from '@mui/icons-material/ListAlt';

const MemberHeader = ( {} ) => {
    const router = useRouter()
    const { id, name } = router.query;
    // const {title, description, icon } = meta;

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-44 font-semibold text-lg text-white`}>{name}</div>
            </div>
            <a href={`/affiliation/${id}?name=${name}`} target='_blank' rel='noreferrer'>
                <ListAlt 
                    className="text-white mr-4 cursor-pointer"
                />
            </a>
        </div>
    ); 
};

export default MemberHeader;
