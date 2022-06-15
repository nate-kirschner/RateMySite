import { useEffect } from 'react';  

function useOutsideClickedAction(action, ...refs) {
    useEffect(() => {
        function handleClickOutside(event) {
            let bool = refs.reduce((acc, ref) => {
                return acc && (ref && ref.current && !ref.current.contains(event.target))
            }, true)
            if (bool) {
                action();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [refs]);
}

export default useOutsideClickedAction