import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

const ManagerBody = ( { data } ) => {
    const {id, name } = data;
    // メンバー情報ページ 
    // Todo: react queryで書き換える
    const [ ManagerInfo, setManagerInfo ] = useState([]);
    const [ InfoArray, setInfoArray ] = useState([]);

    /**
     * 
     * @param {String} birthday_string 誕生日文字列
     * @returns {Integer}
     */
    const getAge = birthday_string => {
        const birthday = new Date(birthday_string);
        //今日
        const today = new Date();
     
        //今年の誕生日
        const thisYearsBirthday = new Date(today.getFullYear(), birthday.getMonth - 1, birthday.getDate);

        //年齢
        const age = today.getFullYear() - birthday.getFullYear();

        if (today < thisYearsBirthday) {
            //今年まだ誕生日が来ていない
            age--;
        }
    
        return age;
    }
    
    useEffect(() => {
        // 地域リスト取得
        const getManagerInfo = async() => {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/managerInfo?id=${id}`);
            const res = await fetch(`https://mm-taupe.vercel.app/api/managerInfo?id=${id}`);
            // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
            const managerInfo = await res.json();
            setManagerInfo(managerInfo);
        }

        if (id) {
            getManagerInfo();
            setInfoArray([ManagerInfo?.info_1, ManagerInfo?.info_2, ManagerInfo?.info_3, ManagerInfo?.info_4, ManagerInfo?.info_5]);
            console.log('ManagerInfo :>> ', ManagerInfo);
        }
    }, [id, ManagerInfo]);

    return (
        <div className="">
            <div className="bg-cyan-500 p-1 mb-1 mt-5">
                <div className="ml-40 font-semibold text-lg text-white">担当者情報</div>
            </div>

            <div className="w-auto text-center">
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">名前　{ManagerInfo?.name}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">性別　{ManagerInfo?.gender === 1 ? '男' : '女'}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">年齢　{getAge(ManagerInfo?.birth)}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">住所　{ManagerInfo?.address}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">電話番号　{ManagerInfo?.phone_number}</div>
            </div>
            {InfoArray?.map((info, index) => 
                <div className="w-auto grow flex flex-row items-center text-center" key={`${index}`}>
                    <div 
                        className="w-full block p-2 mb-2 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                    >
                        <SearchIcon 
                            className="cursor-pointer flex relative top-7 mr-32"
                        />
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{info}</p>
                    </div>
                </div>
            )}
            <div className="bg-cyan-500 p-1 mb-1 mt-5">
                <div className="ml-52 font-semibold text-lg text-white">メモ</div>
            </div>
            <div className="w-auto grow flex flex-col items-center text-center">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{ManagerInfo?.note}</p>
            </div>
        </div>
    ); 
};

export default ManagerBody;
