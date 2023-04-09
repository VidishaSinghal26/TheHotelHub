import React from 'react'
import './NavBar.css'

function NavBar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
   // console.log(user.email)
    return (
        <div>
            <nav class="navbar navbar-expand-lg ">
                <a class="navbar-brand" href="#">The Hotel Hub</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav" id="text">
                        {user ? (<><h1 style={{color:'white'}}>{user.data.name}</h1></>) : (<>
                            <li class="nav-item ">
                            <a class="nav-link" href="/register"><i class="bi bi-arrow-down-square"></i> Register</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login" ><i class="bi bi-box-arrow-in-right"></i> Login</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/#" ><i class="bi bi-person-lines-fill"></i> Contact</a>
                        </li>
                        </>)}

                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default NavBar
