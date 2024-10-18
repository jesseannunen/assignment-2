import React, { useEffect, useState } from "react";


function SearchDrink() {



    const [cocktailName, setCocktailName] = useState("");
    const [cocktails, setCocktails] = useState([]);
    const [error, setError] = useState(null);
    const [randomCocktail, setRandomCocktail] = useState(null);


    useEffect(() => {
        const fetchRandomCocktail = async () => {
            try {
                const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
                const data = await response.json();
                setRandomCocktail(data.drinks[0]);
            } catch (err) {
                setError("Failed to fetch cocktail of the day. ");
                console.error(err);
            }
        };

        fetchRandomCocktail();
    }, []);



    const fetchCocktails = async (name) => {
        try {
            const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
            const data = await response.json();
            console.log(data);


            if (data.drinks) {
                setCocktails(data.drinks);
                setError(null);
            } else {
                setCocktails([]);
                setError("No drinks found for this name.");
            }
        } catch (err) {
            setError("Something went wrong. Try again.");
            console.log(err);
        }
    };

    const handleSearch = () => {
        if (cocktailName) {
            fetchCocktails(cocktailName);

        }
    };


    return (
        <div>
            {randomCocktail ? (
                <div>
                    <h2> {randomCocktail.strDrink} </h2>
                    <img src={randomCocktail.strDrinkThumb} alt= {randomCocktail.strDrink} style={{ width: '200px', height: 'auto' }} />
                    <p><strong>Glass:</strong> {randomCocktail.strGlass} </p>
                    <p><strong>Instructions: </strong>{randomCocktail.strInstructions} </p>
                    <ul>
                        {randomCocktail.strIngredient1 && <li>{randomCocktail.strIngredient1}</li>}
                        {randomCocktail.strIngredient2 && <li>{randomCocktail.strIngredient2}</li>}
                        {randomCocktail.strIngredient3 && <li>{randomCocktail.strIngredient3}</li>}
                        {randomCocktail.strIngredient4 && <li>{randomCocktail.strIngredient4}</li>}
                    </ul>
                </div>

            ) : (
                <p>Loading... </p>
            )}

            <hr />

            <input
                type="text"
                placeholder="Syötä cocktailin nimi"
                value={cocktailName}
                onChange={(e) => setCocktailName(e.target.value)}
            />

            <button onClick={handleSearch}>Search</button>

            {error && <p>{error}</p>}

            <div>
                {cocktails.length > 0 ? (

                    <ul>
                        {cocktails.map((drink, index) => (
                            <li key={index}> {drink.strDrink} </li>
                        ))}
                    </ul>
                ) : (
                    !error && <p>{error}</p>
                )}

            </div>
        </div>
    );
}




export default SearchDrink;






