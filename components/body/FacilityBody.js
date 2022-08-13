import {useEffect, useState} from 'react';

const FacilityBody = ( { data } ) => {
    const {id, user_list } = data;

    // 施設リスト 
    // Todo: react queryで書き換える
    const [ facilityDetail, setFacilityDetail ] = useState([]);
    const [ memberList, setMemberList ] = useState([]);
    
    useEffect(() => {
        // 施設リスト取得
        const getFacilityInfo = async() => {
            // const res = await fetch(`${process.env.NEXT_PUBLIC_HOSTNAME}/api/facilityInfo?id=${id}`);
            const res = await fetch(`https://mm-taupe.vercel.app/api/facilityInfo?id=${id}`);
            // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
            const facility_detail = await res.json();
            setFacilityDetail(facility_detail);
            // 施設で務める従業員のid
            const employee_id_array = [];
            for (const workplace of facility_detail.Workplace) {
                employee_id_array.push(workplace.employee_id);
            }
            // 従業員詳細情報とくっつける
            const member_list = user_list.filter(user => employee_id_array.includes(user.id));
            setMemberList(member_list);
        }
        // https://rios-studio.com/tech/react-hook%E3%81%AB%E3%81%8A%E3%81%91%E3%82%8Btimeout%E3%81%A8timeinterval%E3%80%90%E6%AD%A2%E3%81%BE%E3%82%89%E3%81%AA%E3%81%84%E3%83%BB%E9%87%8D%E8%A4%87%E3%81%99%E3%82%8B%E3%80%91
        // 第二引数設定して止まらないため、応急処置としてsetIntervalを設定する
        const interval = setInterval(() => {
            getFacilityInfo();
        }, 2000);
        return () => clearInterval(interval);
    }, [id, user_list, facilityDetail, memberList]);

    return (
        <div className="">
            <div className="bg-cyan-500 p-1 mb-1 mt-5">
                <div className="ml-48 font-semibold text-lg text-white">施設情報</div>
            </div>

            <div className="w-auto grow flex flex-row items-center text-center">
                <a 
                    href={`/facility/${facilityDetail.id}?name=${facilityDetail.name}`}  
                    className="w-1/2 h-40 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                    key={facilityDetail.id}
                >
                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{facilityDetail.name}</p>
                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white truncate">{facilityDetail.address}</p>
                </a>

                <a 
                    href={`/manager/${facilityDetail.Manager?.id}?name=${facilityDetail.Manager?.name}`}  
                    className="w-1/2 h-40 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                    key={facilityDetail.Manager?.id}
                >
                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">担当者　{facilityDetail.Manager?.name}</p>
                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">役職　{facilityDetail.Manager?.position}</p>
                    <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{facilityDetail.Manager?.phone_number}</p>
                </a>
            </div>

            <div className="bg-cyan-500 p-1 mb-1 mt-5">
                <div className="ml-36 font-semibold text-lg text-white">担当メンバーリスト</div>
            </div>
            <div className="w-auto grow flex flex-col items-center text-center">
                {memberList?.map((member) => 
                    <a 
                        href={`/member/${member.id}?name=${member.name}`}  
                        className="w-3/4 block p-6 m-2 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700" 
                        key={member.id}
                    >
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{member.name}</h5>
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{member.phone_number}</p>
                    </a>
                )}
            </div>
        </div>
    ); 
};

export default FacilityBody;
