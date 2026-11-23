import React from "react";
import "./Sidebar.css";

const Sidebar = ( {activeTab, setActiveTab}) => {
    return (
        <aside className="sidebar">
            {/* LOGO */}
            <div className="logo">
                <div className="logo-icon"> N </div>
                <div>
                    <h2>NoteTest</h2>
                    <p>Capture * Organise * grow</p>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="sidebar-nav">

                <button
                    className = {activeTab === "all" ? "nav-item active" : "nav-item"}
                    onClick = {() => setActiveTab("all")}
                >
                    <span>▦</span>
                    All Notes
                </button>

                <button
                    className = {activeTab === "pinned" ? "nav-item active": "nav-item"}
                    onClick = {() => setActiveTab("pinned")}
                >
                    <span>📌</span>
                    Pinned Notes
                </button>

            </nav>

            <div className="sidebar-footer">
                <p>Keep your ideas organized!</p>
                <span>💜</span>
            </div>
            
        </aside>
    )
}

export default Sidebar;