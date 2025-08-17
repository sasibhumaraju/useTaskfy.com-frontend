import React from 'react'
import Style from './tags.module.css'

function Tag({text, colorNum=null}) {
    const colors = [{bgColor: "#E8F5E9", textColor: "#2E7D32"},
        {bgColor: "#E3F2FD", textColor: "#1565C0"},
        {bgColor: "#FFF3E0", textColor: "#EF6C00"},
        {bgColor: "#E0F2F1", textColor: "#00796B"},
        {bgColor: "#FFEBEE", textColor: "#C62828"},
        {bgColor: "#EDE7F6", textColor: "#512DA8"},
        {bgColor: "#F3E5F5", textColor: "#6A1B9A"},
        {bgColor: "var(--bg-emphasis)", textColor: "var(--text-default)"},
     ]
     var randomNumber = Math.floor(Math.random() * 7);
     randomNumber = colorNum? colorNum : randomNumber;
  return (
    <div className={Style.tag} style={{backgroundColor: text? colors[randomNumber].bgColor:"transparent", color:colors[randomNumber].textColor, }}>
    {text}
    </div>
  )
}

export default Tag;