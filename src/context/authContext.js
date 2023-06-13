// AuthContext.js
import React, { createContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const auth = {
    user: {},
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}
