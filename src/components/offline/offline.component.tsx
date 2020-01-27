import React, {FunctionComponent, useEffect, useState} from 'react';
import './offline.component.scss';

const OfflineComponent: FunctionComponent = () => {
    const [ show, setShow ] = useState(false);

    const checkOffline = (): void => {
        setShow(true);
    };

    const checkOnline = (): void => {
        setShow(false);
    };

    useEffect(() => {
        window.addEventListener("offline", checkOffline);
        window.addEventListener("online", checkOnline);

        return () => {
            window.removeEventListener("offline", checkOffline);
            window.removeEventListener("online", checkOnline);
        };
    });

    return <div className={`offline-component ${show ? '' : 'hidden'}`}>There is no connection to the internet!</div>;
};

export default OfflineComponent;
