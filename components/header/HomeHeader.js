import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

const HomeHeader = ( {} ) => {
    // const {title, description, icon } = meta;
    // 表示非表示切り替え用
    const [ showItemFlag, setShowItemFlag ] = useState(false);
    // タイトルinput欄文字数カウント用
    const [ issetValue, setIssetValue ] = useState(false);
    // ユーザーリスト 
    // Todo: react queryで書き換える
    const [ userList, setUserList ] = useState([]);
    const [ filteredUserList, setFilteredUserList ] = useState(userList);

    // メンバー検索欄の表示非表示を制御
    const toggle_member_search_form = () => setShowItemFlag(!showItemFlag);

    // メンバー情報を検索
    const search_member_info = (input) => {
        const filtered_user_list = userList.filter(user => user.name.includes(input));
        setFilteredUserList(filtered_user_list);
        // 入力があるかどうか、ない場合インクリメントサーチ非表示
        input ? setIssetValue(true) : setIssetValue(false);
    }

    useEffect(() => {
        // ユーザーリスト取得
        const getUserList = async() => {
            const res = await fetch(`http://${window.location.host}/api/userList`);
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
                    className={`w-48 ml-24 font-semibold text-lg p-1 ${!showItemFlag ? 'hidden' : ''}`}
                    onChange={ (e) => search_member_info(e.target.value) }
                /> 
            </div>
            <ul className={`absolute w-48 bg-white border border-solid border-gray-300 left-28 top-14 ml-1 ${!showItemFlag || !issetValue ? 'hidden' : ''}`} >
                {filteredUserList?.map((user) => 
                    <li 
                        className="border border-solid border-gray-100"
                        key={user.id}>
                        <a href={`/member/${user.id}?name=${user.name}`} >{user.name}</a>
                    </li>
                )}
            </ul>
            <div>
                <SearchIcon 
                    onClick={ toggle_member_search_form } 
                    className="text-white mr-4 cursor-pointer"
                />
            </div>
        </div>
    ); 
};

export default HomeHeader;
