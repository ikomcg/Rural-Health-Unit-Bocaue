import React from 'react'

import Diet_Weight from '../../images/section-healthy/Diet_Weight.jpg'
import Fitness_and_Excercise from '../../images/section-healthy/Fitness_and_Excercise.jpg'
import Health_Beauty from '../../images/section-healthy/Health_Beauty.jpg'
import Pregnance from '../../images/section-healthy/Womens_Health.jpg'
import Mental_Health from '../../images/section-healthy/mental_health.jpg'
import Cards from '../../components/home/Cards'

const livingHealthy = [
    {src: Mental_Health, topic: 'Mental Health'},
    {src: Diet_Weight, topic: 'Weight Management'},
    {src: Pregnance, topic: 'Pregnancy'},
    {src: Health_Beauty, topic: 'Sex & Relationship'},
    {src: Fitness_and_Excercise, topic: 'Fitness & Excercise'}
]

const Living_Healthy = () => {
  return (
    <>
        <Cards title='Living Healthy' topic={livingHealthy} />
    </>
  )
}

export default React.memo(Living_Healthy)