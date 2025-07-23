import React from 'react'
import App from '../../app/App'
import Appbar from '../../components/appbar/Appbar'

function Checklist() {
  return (
    <div>
        <Appbar showBackButton={true} title="Checklist" subtitle="Manage your tasks efficiently" showActionsButtons={true} />
    </div>
  )
}

export default Checklist