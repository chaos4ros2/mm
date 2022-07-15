import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

const LocationHeader = ( {} ) => {
    // const {title, description, icon } = meta;
    // 表示非表示切り替え用
    const [ showItemFlag, setShowItemFlag ] = useState(false);
    // タイトルinput欄文字数カウント用
    const [ issetValue, setIssetValue ] = useState(false);
    // ユーザーリスト 
    // Todo: react queryで書き換える
    const [ userList, setUserList ] = useState([]);
    
    // メンバー検索欄の表示非表示を制御
    const toggle_member_search_form = () => setShowItemFlag(!showItemFlag);

    // メンバー情報を検索
    const search_member_info = () => {
        console.log('test :>> ', 'test');
    }

    useEffect(() => {
        // ユーザーリスト取得
        const getUserList = async() => {
            const res = await fetch(`http://localhost:3000/api/userList`);
            // https://github.com/prisma/prisma-examples/blob/latest/javascript/rest-nextjs/pages/p/%5Bid%5D.jsx#L65
            const user_list = await res.json();
            setUserList(user_list);
        }
        getUserList();
    }, []);

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-32 font-semibold text-lg text-white ${showItemFlag ? 'hidden' : ''}`}>メンバー名簿</div>
                <input 
                    className={`ml-24 font-semibold text-lg ${!showItemFlag ? 'hidden' : ''}`}
                    onChange={ (e) => e.target.value ?  setIssetValue(true) : setIssetValue(false) }
                /> 
            </div>
            {userList?.map((user) => 
                <li className="pb-4 flex" key={user.id}>
                    {user.name} 
                </li>
            )}
            <div>
                <SearchIcon 
                    onClick={issetValue ? search_member_info : toggle_member_search_form} 
                    className="text-white mr-4 cursor-pointer"
                />
            </div>
        </div>
    ); 
};

export default LocationHeader;
