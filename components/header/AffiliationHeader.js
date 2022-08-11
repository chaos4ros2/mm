import {useEffect, useState} from 'react';

const AffiliationHeader = ( {  } ) => {
    // const {title, description, icon } = meta;

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-40 font-semibold text-lg text-white`}>所属リスト</div>
            </div>
        </div>
    ); 
};

export default AffiliationHeader;
