import { useMemo, useState  } from 'react'

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'd43a122a3fmsh8932d0f80d906a8p110115jsn5a0b6503dac2',
		'X-RapidAPI-Host': 'covid-19-news.p.rapidapi.com'
	}
};
type useFetchType = {
  url : string
}

export const useFetch = ({url} : useFetchType) => {

    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useMemo(()=> {
        fetch(url, options)
        .then(response => response.json())
        .then(data =>  {setData(data.articles); setIsLoading(false)})
       .catch(err => console.error(err))
    },[url])

  return {
    data,
    isLoading
  }
} 
