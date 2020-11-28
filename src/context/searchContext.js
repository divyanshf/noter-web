import { useState, createContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = (props) => {
    const [search, setSearch] = useState("");

    return (
        <SearchContext.Provider value={[search, setSearch]}>
            {props.children}
        </SearchContext.Provider>
    );
}