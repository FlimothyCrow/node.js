import React from "react"

function App() {
    const [word, setWord] = React.useState("password")
    const [associations, setAssociations] = React.useState(null)
    const getAssociations = () => {
        fetch("/api/associations/" + word)
            .then((result) => result.json())
            .then((body) => setAssociations(body))
    }
    console.log(associations)
    console.log(word)
    return (
        <div className="app">
            <h1>Word Associations Map</h1>
            <input value={word} onChange={(e) => setWord(e.target.value)} />
            <button onClick={getAssociations}>Find Associations</button>
            {associations &&
                (Object.keys(associations).length === 0 ? (
                    <p>No results</p>
                ) : (
                    <div>
                        {Object.entries(associations).map(([association, score], idx) => (
                            <span key={idx} style={{ fontSize: Math.pow(score * 500, 2) / 200 }}>
                                {association}{" "}
                            </span>
                        ))}
                    </div>
                ))}
        </div>
    )
}

export default App
