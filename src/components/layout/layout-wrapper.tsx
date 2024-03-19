import React from "react";


export default function LayoutWrapper({
    children
}:{
    children:React.ReactNode
}){
    // original style  flex min-h-screen flex-col p-24
    const style = `flex min-h-screen`
    return(<div className={style}>{children}</div>)
}