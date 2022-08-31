import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const DetailBody = ( { data } ) => {
    const { information_detail } = data;

    const router = useRouter()
    const { name } = router.query;

    const formatDate = (current_datetime_string) => {
        const current_datetime = new Date(current_datetime_string);
        const formatted_date = `${current_datetime.getFullYear()}・${(current_datetime.getMonth() + 1).toString().padStart(2, '0')}・${current_datetime.getDate().toString().padStart(2, '0')}　${current_datetime.getHours().toString().padStart(2, '0')} : ${current_datetime.getMinutes().toString().padStart(2, '0')} : ${current_datetime.getSeconds().toString().padStart(2, '0')}`;
        return formatted_date;
    }

    return (
        <div>
            <div className="w-auto text-center">
                <div className="mt-2 mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{formatDate(information_detail[0]?.created_at)}　{information_detail[0]?.employee.name}</div>
            </div>

            <div className="w-auto text-center">
                <div className="mt-5 mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{information_detail[0]?.title}</div>
            </div>

            <div className="w-auto grow flex flex-col items-center text-center">
                {information_detail?.map((detail) => 
                    <textarea 
                        className="w-3/4 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                        key={detail.id}
                    >
                        {detail.text}
                    </textarea>
                )}
            </div>
        </div>
    ); 
};

export default DetailBody;