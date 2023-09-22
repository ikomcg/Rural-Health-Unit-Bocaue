import React from 'react'
import style from './Style.module.scss'

const NewsCard = ({data} : any) => {
  return (
    <a href={data.link} className={`${style.covid_19_news} w-1/2 px-3`} rel="noreferrer" target="_blank">
        <div className='flex flex-row flex-nowrap'>
        <img
          style={{
            maxWidth:'100px',
            height : '100px'
          }}
          loading='lazy'
          src={data.media}
        />
        <div className='px-3'>
            <h5 className='text-2xl text-black font-bold'>{data.title}</h5>
            <p >{data.summary}</p>
        </div>
        </div>
    </a>  
  )
}

export default React.memo(NewsCard)