import {useEffect, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';

const LocationHeader = ({  }) => {
    // const {title, description, icon } = meta;
    const [ showItemFlag, setShowItemFlag ] = useState(false);
    
    const toggle_member_search_form = () => setShowItemFlag(!showItemFlag)

    return (
        <div className="w-auto grow flex items-center">
            <div className="text-sm grow shrink-0 mr-4">
                <div className={`ml-32 font-semibold text-lg text-white ${showItemFlag ? 'hidden' : ''}`}>メンバー名簿</div>
                {/* Todo：input欄に文字が入力されるとメンバー検索のイベントをアクティブにする */}
                <input className={`ml-24 font-semibold text-lg ${!showItemFlag ? 'hidden' : ''}`} /> 
            </div>
            <div>
                <SearchIcon onClick={toggle_member_search_form} className="text-white mr-4 cursor-pointer"/>
            </div>
        </div>
    ); 
};

export default LocationHeader;
