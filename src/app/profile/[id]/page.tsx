import React from 'react'

function UserProfile({params}: any) {
  return (
    <div className='text-4xl'>
      <h2>Users ID: {params.id}</h2>
    </div>
  )
}

export default UserProfile