import {useEffect, useState} from 'react';

const LocationHeader = ( { name } ) => {
    // const {title, description, icon } = meta;

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-32 font-semibold text-lg text-white`}>{name}</div>
            </div>
        </div>
    ); 
};

export default LocationHeader;
