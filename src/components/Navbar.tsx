import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <nav className="bg-white shadow p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-purple-600 text-2xl font-bold">
          MemeGen
        </NavLink>
        <div className="flex space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'text-purple-600' : 'text-green-600'
            }
          >
            Home
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? 'text-purple-600' : 'text-green-600'
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/create-meme"
                className={({ isActive }) =>
                  isActive ? 'text-purple-600' : 'text-green-600'
                }
              >
                Create Meme
              </NavLink>
            </>
          )}
          {isAuthenticated ? (
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="text-green-600"
            >
              Logout
            </button>
          ) : (
            <button onClick={() => loginWithRedirect()} className="text-green-600">
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
