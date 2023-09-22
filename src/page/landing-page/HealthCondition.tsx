import React from 'react'

import Diabetes from '../../images/health-condition/diabetes-img.webp'
import Migraine from '../../images/health-condition/inflamm-img.webp'
import MultipleSclerosis from '../../images/health-condition/multiple-img.webp'
import BreastCancer from '../../images/health-condition/Breast-cancer.webp'
import RheumatoidArthritis from '../../images/health-condition/rheumoid.webp'
import Cards from '../../components/home/Cards'



const healthCondition = [
    {src:Diabetes , topic: 'Diabetes'},
    {src: Migraine, topic: 'Migraine'},
    {src: MultipleSclerosis, topic: 'Multiple Sclerosis'},
    {src: BreastCancer, topic: 'Breast Cancer'},
    {src: RheumatoidArthritis, topic: 'Rheumatoi dArthritis'}
]
const HealthCondition = () => {
  return (
    <Cards title='Health Condition' topic={healthCondition} />
  )
}

export default React.memo(HealthCondition)