import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

const MemberBody = ( { data } ) => {
    const {id, name } = data;
    // メンバー情報ページ 
    // Todo: react queryで書き換える
    const [ MemberInfo, setMemberInfo ] = useState([]);
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
        const getMemberInfo = async() => {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/memberInfo?id=${id}`);
            const res = await fetch(`https://mm-taupe.vercel.app/api/memberInfo?id=${id}`);
            // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
            const member_info = await res.json();
            setMemberInfo(member_info);
        }

        if (id) {
            getMemberInfo();
            setInfoArray([MemberInfo?.info_1, MemberInfo?.info_2, MemberInfo?.info_3, MemberInfo?.info_4, MemberInfo?.info_5]);
            console.log('MemberInfo :>> ', MemberInfo);
        }
    }, [id, MemberInfo]);

    return (
        <div className="">
            <div className="bg-cyan-500 p-1 mb-1 mt-5">
                <div className="ml-40 font-semibold text-lg text-white">メンバー情報</div>
            </div>

            <div className="w-auto text-center">
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">名前　{MemberInfo?.name}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">性別　{MemberInfo?.gender === 1 ? '男' : '女'}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">年齢　{getAge(MemberInfo?.birth)}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">住所　{MemberInfo?.address}</div>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">緊急連絡先　{MemberInfo?.emergency_contact}</div>
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
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{MemberInfo?.note}</p>
            </div>
        </div>
    ); 
};

export default MemberBody;
