import {useEffect, useState} from 'react';
import { useRouter } from 'next/router'

const InformationBody = ( { data } ) => {
    const { information_list } = data;

    const router = useRouter()
    const { name } = router.query;

    const formatDate = (current_datetime_string) => {
        const current_datetime = new Date(current_datetime_string);
        const formatted_date = `${current_datetime.getFullYear()}・${(current_datetime.getMonth() + 1).toString().padStart(2, '0')}・${current_datetime.getDate().toString().padStart(2, '0')}　${current_datetime.getHours().toString().padStart(2, '0')} : ${current_datetime.getMinutes().toString().padStart(2, '0')} : ${current_datetime.getSeconds().toString().padStart(2, '0')}`;
        return formatted_date;
    }

    /**
     * 指定のパラメーターをURLに追加する
     * 
     * @param {array} params 追加するパラメーターのオブジェクト
    */
    const set_param = (params) => {
        const url = new URL(window.location.href);
    
        for (const key in params) {
            const value = params[key];
            if (value) {
                if (!url.searchParams.get(key)) url.searchParams.append(key, value); // 追加
                else url.searchParams.set(key, value); // 上書    
            } else url.searchParams.delete(key, value); // 削除
        }
        window.history.pushState({}, '', url.href);
    }
    
    /**
     * 
     * @param {obj} e カレンダー変更イベント
     * @param {obj} date 変更した日付
     */
    const change_date = (e, date) => {
        if (e.target.name === 'start') set_param({ 'start' : date });
        else set_param({ 'end' : date });
        location.reload();
    }

    // Todo：従業員ごとに背景を変える
    return (
        <div>
            <div className="text-sm grow shrink-0 mr-4">
                <input
                    type = "date"
                    name = "start"
                    value = {router.query.start ? router.query.start : `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().setDate(1)).getDate().toString().padStart(2, '0')}`}
                    className = {`w-35 ml-20 text-lg p-1`}
                    onChange = { (e) => change_date(e, e.target.value) }
                /> 〜
                <input
                    type = "date"
                    name = "end"
                    value =  {router.query.end ? router.query.end : `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date(new Date().setDate(0)).getDate().toString().padStart(2, '0')}`}
                    className = {`w-35 ml-4 text-lg p-1`}
                    onChange = { (e) => change_date(e, e.target.value) }
                /> 
            </div>
            <div className="w-auto grow flex flex-col items-center text-center">
                {information_list?.map((information) => 
                    <a 
                        href={`/detail/${information.id}`}  
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
