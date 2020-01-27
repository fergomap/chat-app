import React, {FunctionComponent} from 'react';
import './go-back-header.component.scss';
import backIcon from 'icons/back.svg';
import {History} from 'history';

interface GoBackHeaderComponentProps {
    history: History;
    title: string;
}

const GoBackHeader: FunctionComponent<GoBackHeaderComponentProps> = (props) => {
    return <div className="go-back-header">
        <svg onClick={() => props.history.goBack()}>
            <use xlinkHref={`${backIcon}#back`}/>
        </svg>
        <h4>{ props.title }</h4>
    </div>;
};

export default GoBackHeader;
