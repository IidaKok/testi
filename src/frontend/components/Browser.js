import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../App.css";

/* kun tietokanta yhdistetty, korvaa package.json tiedoston "start": kohta tällä: "start": "react-scripts start", */

export const SeriesBrowser = () => {
    const [series, setSeries] = useState([]);

    // Testidataa, jolla testataan, miltä tuleva arkistosivu näyttäisi. Kirjat ovat sarjoittain.
    const [SerTestingData, setSerTestingData] = useState([
        {
            "id": 1,
            "name": "Sarja X",
            "author": "Ville Viimeinen"
        },
        {
            "id": 2,
            "name": "Lehtisarja ABC",
            "author": "Ville Viimeinen"
        },
        {
            "id": 3,
            "name": "Sarjakuvia",
            "author": "Maija Meikäläinen"
        },
        {
            "id": 4,
            "name": "Kuvakirjakokoelma",
            "author": "Liisa Litmanen"
        },
        {
            "id": 5,
            "name": "Runokirjasarja",
            "author": "Ville Viimeinen"
        },
        {
            "id": 6,
            "name": "Käsityösarja",
            "author": "Maija Meikäläinen"
        },
        {
            "id": 7,
            "name": "Kokkikirjasarja",
            "author": "Erkki Esimerkki"
        },
        {
            "id": 8,
            "name": "Tarinasarja",
            "author": "Erkki Esimerkki"
        },
        {
            "id": 9,
            "name": "Tietokirjasarja",
            "author": "Liisa Litmanen"
        },
        {
            "id": 10,
            "name": "Tee-se-itse -sarja",
            "author": "Ville Viimeinen"
        }
    ])

    // Voi muuttua paljon vielä.
    const tblCell = {
        border: "1px solid black",
        textAlign: "left",
        borderRadius: "4px"
    };
    const tblCellSer = {
        border: "1px solid black",
        textAlign: "left",
        borderRadius: "4px",
        width: "400px"
    };

    // poistaa linkkien alleviivaukset
    const noUnderLine = {
        textDecoration: "none"
    };

    
    // testi fetch. Luultavasti poistetaan kokonaan myöhemmin, kun tietokanta on kunnolla yhdistetty.
    /*
    useEffect( () => {
        const fetchSeries = async () => {
            let response = await fetch("http://localhost:3004/sarjat?");
            setSeries(await response.json());
            setSeriesTableRows(series.map((serie) => {
                return (
                    <tr key={serie.id}>
                        <td style={tblCellBorder}>{serie.name}</td>
                        <td style={tblCellBorder}>{serie.author}</td>
                    </tr>
                )
            }));
        }
        fetchSeries();
    }, []);
    */
    
    // Lopullinen fetch:
    useEffect( () => {
        const fetchSeries = async () => {
            let response = await fetch("http://localhost:5000/api/bookseries");
            let c = await response.json();
            setSeries(c);
            console.log(series);
        }

        fetchSeries();
    }, []);

    return (
        <div>
            <table >
                <thead>
                    <tr style={{height: "35px", backgroundColor: "lavender"}}>
                        <th style={tblCellSer}>Series</th>
                        <th style={tblCell}>Publishers</th>
                    </tr>
                </thead>
                <tbody>
                    {   // haettu data
                    series.map((s, index) => {
                        return (
                            <tr key={index}>
                                <td style={tblCell}><a href='#' style={{color: "green", textDecoration: "none"}}>+</a>  <a href='#' style={noUnderLine} onClick={(e) => e.preventDefault()}>{s.bookseries}</a></td>
                                <td style={tblCell}><a href='#' style={noUnderLine} onClick={(e) => e.preventDefault()}>x{/*s.publisher*/}</a></td>
                            </tr>
                        )
                        }) 
                    /* // testidata
                    SerTestingData.map((s, index) => {
                        return (
                            <tr key={index}>
                                <td style={tblCell}><a href='#' style={{color: "green", textDecoration: "none"}}>+</a>  <a href='#' style={noUnderLine} onClick={(e) => e.preventDefault()}>{s.name}</a></td>
                                <td style={tblCell}><a href='#' style={noUnderLine} onClick={(e) => e.preventDefault()}>{s.author}</a></td>
                            </tr>
                        )
                        })
                    */}
                    
                </tbody>
            </table>
        </div>
    )
}