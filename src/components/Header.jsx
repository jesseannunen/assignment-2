import React from "react";


function Header ({title }) {


    return(
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <h1>{title}</h1>
    </div>

    );
}

export default Header;