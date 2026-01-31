import { useContext } from 'react'
import { moviecontext } from '../App'
import CategoryNavigator from '../components/CategoryNavigator'
import { categories, langauages } from '../assets/data'
import MovieCard from '../components/MovieCard'

function Upcoming() {
  let { Mov, setMovie } = useContext(moviecontext)
  const upcomingmovies = Mov.filter(movie => movie.released === false)
  const releasedmovies = Mov.filter(movie => movie.released !== false)
  const [filter, setfilter] = useState({ langauage: null, category: null })
    let FilterMovie = async () => {
      try {
        let { data } = await axios(`/api/movie/filtermovie-query/?langauage=${filter.langauage}&category=${filter.category}`)
        console.log(data)
        setMovie([...data.data])
      } catch (error) {
        console.log(error)
   
      }
    }
    console.log(filter)
    useEffect(() => {
      FilterMovie()
    }, [filter])
  return (
    <>
       <div className='py-2 md:p-5 md:m-10 '>
      <div className='flex  w-full'>
        <h2 className='text-2xl font-medium'>Upcoming Movies</h2>
      </div>
      <div className=" flex overflow-x-scroll md:overflow-hidden gap-3 py-2 md:p-5 ">
        
        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Filter
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, langauage: "English" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          English
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, langauage: "Hindi" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Hindi
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, category: "action" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Action
        </button>
 
        <button onClick={() => {
          setfilter({ ...filter, category: "biography" })
 
        }} className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          Biography
        </button>
 
        <button className="px-4 py-2  border border-gray-300 rounded-xl hover:bg-gray-200 transition">
          3D
        </button>
      </div>
       <div className='flex gap-10 w-full flex-wrap p-3'>
          {
            upcomingmovies.map((v, i) => {
              return (
                <MovieCard movie={v} key={i} />
              )
            })
          }
        </div>
      </div>
      <div className='p-5 m-10 '>
        <h2 className='text-3xl font-bold'>Book your Favourite Movie</h2>
        <div className='flex gap-10 w-full flex-wrap p-3'>
          {
            releasedmovies.map((v, i) => {
              return (
                <MovieCard movie={v} key={i} />
              )
            })
          }
        </div>
      </div>
      <CategoryNavigator category={"Genre"} redirecturl={"category"} data={categories} />
      <CategoryNavigator category={"langauage"} redirecturl={"langauage"} data={langauages} />
   
    </>
  )
}

export default Upcoming