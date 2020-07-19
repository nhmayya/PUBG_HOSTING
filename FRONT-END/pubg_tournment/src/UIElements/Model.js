import React from 'react';

import './Model.css';
import Back from './Back';

const Model = ( props ) => (
    <div>
        <Back show={props.show} />
        <div className="Model">
            {props.children}
        </div>
        </div>
);

export default Model;