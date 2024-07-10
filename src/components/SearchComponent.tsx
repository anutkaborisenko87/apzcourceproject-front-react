import {useEffect, useState} from "react";
import {MagnifyingGlassIcon, XCircleIcon} from "@heroicons/react/24/outline";

type SearchComponentProps = {
    title: string
    search_value?: string | null
    onChange: (searchTerm: string) => void,
    onCancelSearch: () => void,
    onBeganSearch: () => void,
    isInputVisible: boolean,
}
const SearchComponent = ({ title, search_value, onChange, onCancelSearch, isInputVisible, onBeganSearch}: SearchComponentProps) => {

    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        // @ts-ignore
        return setSearchTerm(search_value);
    }, [search_value]);

    // @ts-ignore
    return (
        <>
            {isInputVisible ? (
                <div className="relative" title={title}>
                    <input
                        className={"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"}
                        type="text"
                        value={searchTerm}
                        autoFocus={true}
                        onChange={(e) => {
                            const { value } = e.target;
                            setSearchTerm(value);
                            onChange(value);
                        }}/>
                    <XCircleIcon onClick={() => {
                        // @ts-ignore
                        onCancelSearch();
                        setSearchTerm('');
                    }}
                                 className="absolute right-2 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"/>
                </div>
            ) : (
                <MagnifyingGlassIcon title={title} onClick={onBeganSearch}
                                     className="w-4 h-4 cursor-pointer"/>
            )}
        </>
    );
};

export default SearchComponent;