import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const InformationBody = ( { data } ) => {
    const { information_list } = data;

    const router = useRouter()
    const { name } = router.query;

    const formatDate = (current_datetime_string) => {
        const current_datetime = new Date(current_datetime_string);
        const formatted_date = `${current_datetime.getFullYear()}-${current_datetime.getMonth() + 1}-${current_datetime.getDate()} ${current_datetime.getHours()}:${current_datetime.getMinutes()}:${current_datetime.getSeconds()}`;
        return formatted_date;
    }

    // Todo：従業員ごとに背景を変える
    return (
        <div>
            <div className="w-auto grow flex flex-col items-center text-center">
                {information_list?.map((information) => 
                    <a 
                        href={`/facility/${information.id}?name=${information.title}`}  
                        className="w-3/4 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                        key={information.id}
                    >
                        <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{formatDate(information.created_at)}</p>
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{information.title}</p>
                        <p className="mb-2 tracking-tight text-gray-900 dark:text-white">{information.employee.name}</p>
                    </a>
                )}
            </div>
        </div>
    ); 
};

export default InformationBody;
