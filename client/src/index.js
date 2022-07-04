import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import FrontPage from "./FrontPage"
import NewMeme from "./NewMeme"
import MemePage from "./MemePage"
import reportWebVitals from "./reportWebVitals"
import { Link, BrowserRouter, Routes, Route, Outlet } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<FrontPage />} />
                <Route path="new" element={<NewMeme />} />
                <Route path="meme/:memeId" element={<MemePage />} />
            </Route>
        </Routes>
    </BrowserRouter>
)

function Layout() {
    const [userId, setUserId] = React.useState(1)
    return (
        <div>
            <nav>
                <Link to="/">Front page</Link> | <Link to="new">New Meme</Link>
                <input type="text" value={userId} onChange={(event) => setUserId(event.target.value)} />
            </nav>
            <div className="content">
                <Outlet context={[userId]} />
            </div>
        </div>
    )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
