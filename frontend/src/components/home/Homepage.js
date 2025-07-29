import React from "react";

function Homepage() {
    return (
        <div className="page-container">
            <div className="main-content">
                <div className="content-container">
                    <h1>CUBIX</h1>
                    <div className="options">
                        <select>
                            {/*connect first the backend with the db and the use api and useState for the dropdown*/}
                        </select>
                    </div>
                </div>
                <div className="leftbar">
                    <p className="leftbarText">Learn how to solve Rubic's cube</p>
                    {/* insert images of some cubes and have buttons for the page with the algorithms and for the scrambles */}
                </div>
                <div className="leftbar2">
                    <h3 className="leftbar2Text">PB:</h3>
                </div>
                <div className="leftbar2">
                    <h3 className="leftbar2Text">Worst time:</h3>

                </div>
                <div className="leftbar2">
                    <h3 className="leftbar2Text">Average time:</h3>
                </div>
            </div>

            <footer className="footer">
                <p>&copy; {new Date().getFullYear()}All rights reserved.</p>
            </footer>
        </div>
    )
}
export default Homepage;