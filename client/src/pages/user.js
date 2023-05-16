import UserDetails from "../components/userDetails";

import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"


function UserPage() {
  const [user, setUser] = useState(null)
  let param = useParams()

  useEffect(() => {
    fetch("/api/user/" + param.id)
      .then((response) => response.json())
      .then((data) => {
        setUser(data)
      })
      .catch((error) => console.error(error))
  }, [param.id])


  return (
    <div>
      <UserDetails user={user} />
      
    </div>
  );
}

export default UserPage;
