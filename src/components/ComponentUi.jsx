import React, { useState} from "react";
import Header from "./Header";
import SearchDrink from "./SearchDrink";


function ComponentUi() {



    return (

        <div>

            <div>
                <Header title="Cocktail of the day" />
                <SearchDrink />
                
            </div>
            
                
        </div>

    )
}

export default ComponentUi;
