import React, { useContext } from 'react'
import { moviecontext } from '../App'
import { useNavigate } from 'react-router-dom'
// const movies=[
//   {
//     name: "Tere Ishk Mein",
//     releasedate: "20 Dec 2025",
//     released: true,
//     poster: "https://cdn.nishtyainfotech.com/content/stories/thumb/thumb692939de8674a2.66740048.webp",
//     video: "url,",
//     category: ["Drama", "Thrilar"],
//     genre: "UA7+",
//     langauage: "Hindi ",
//     length: "1 hour 30 minutes",
//     description: "sdscc",
//     rating: 3.3,
//     cast: [
//       { image: "", name: "" }
//     ]
//   },
//   {
//     name: "Fighter",
//     releasedate: "20 Dec 2025",
//     released: true,
//     poster: "https://th.bing.com/th/id/OIP.bAfS3SUQfQs-VES0YemmnAHaE6?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
//     video: "url,",
//     category: ["Drama", "Thrilar"],
//     genre: "UA/16+ ",
//     langauage: "Hindi ",
//     length: "1 hour 30 minutes",
//     description: "sdscc",
//     rating: 3.3,
//     cast: [
//       { image: "", name: "" }
//     ]
//   }
// ]
function Movie() {
  let {Mov,setMovie}=useContext(moviecontext)
  let navigate=useNavigate();
    const releasedmovies = Mov.filter(movie => movie.released !== false)
  return (

    <div className='p-5 m-10 '>
        <div className='flex justify-between w-full'>
      <h2 className='text-3xl font-bold'>Now Showing</h2>
      <p>View all</p>
      </div>
      <div className='flex gap-3 p-5'>
        <button className='border-1 px-3'>filter </button>
        <button className='border-1 px-3'>Top  Selling</button>
        <button className='border-1 px-3'>English</button>
        <button className='border-1 px-3'>Hindi</button>
        <button className='border-1 px-3'>Romance</button>
        <button className='border-1 px-3'>Drama</button>
        <button className='border-1 px-3'>3D</button>
      </div>
      <div className='flex gap-10 w-full flex-wrap p-3'>
        {
          releasedmovies.map((v,i)=>{return(
            
<div  className='w-[22%] h-[450px] border-1   rounded-b-lg '  onClick={() => { navigate(`/movies/${i}`);}}>
            <img src={v.poster} alt="" className='w-full h-[85%] object-cover' />
            <p className='px-5 font-bold'>{v.name}</p>
            <p className='px-5'>{v.genre},{v.langauage}</p>
        </div>
            

          )})
        }
        
         
         {/* <div  className='w-[22%] h-[450px] border-1   rounded-b-lg '>
            <img src="https://m.media-amazon.com/images/M/MV5BNTliYTliNGQtNjdkOS00MGY1LWE4NmItYTEyNjkyNmFjZGJiXkEyXkFqcGc@._V1_.jpg" alt="" className='w-full h-[85%] ' />
            <p className='px-5 font-bold'>De De Pyar de 2</p>
            <p className='px-5'>UA16+ Hindi</p>
        </div>
         <div  className='w-[22%] h-[450px] border-1   rounded-b-lg '>
            <img src="https://th.bing.com/th/id/R.5a8bfa3409fedae57aa7456318a879cd?rik=LJ8wN6iq0Y7RIA&riu=http%3a%2f%2fwebneel.com%2fdaily%2fsites%2fdefault%2ffiles%2fimages%2fdaily%2f01-2019%2f15-movie-poster-design-kahaani2-bollywood-hindi-prathoolnt.jpg&ehk=iyk92u8fRjp%2bnXK04dWDFPkrfFfS%2fVCxKXgL4K9sFJg%3d&risl=&pid=ImgRaw&r=0" alt="" className='w-full h-[85%] ' />
            <p className='px-5 font-bold'>Kahaani 2</p>
            <p className='px-5'>UA16+ Hindi</p>
        </div>
         <div  className='w-[22%] h-[450px] border-1   rounded-b-lg '>
            <img src="https://tse1.mm.bing.net/th/id/OIP.O7luiOa6aIJpHrYyNrDiEgHaHj?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" className='w-full h-[85%] ' />
            <p className='px-5 font-bold'>Matii 4</p>
            <p className='px-5'>UA16+ Hindi</p>
        </div>
         <div  className='w-[22%] h-[450px] border-1   rounded-b-lg '>
            <img src="https://stat5.bollywoodhungama.in/wp-content/uploads/2023/03/65-English-2.jpg" alt="" className='w-full h-[85%] ' />
            <p className='px-5 font-bold'>65</p>
            <p className='px-5'>UA16+ Hindi ,English</p>
        </div>
         <div  className='w-[22%] h-[450px] border-1   rounded-b-lg '>
            <img src="https://img.youtube.com/vi/H0YJENq2ZMI/maxresdefault.jpg" alt="" className='w-full h-[85%] ' />
            <p className='px-5 font-bold'>Gustaakh ishq</p>
            <p className='px-5'>UA16+ Hindi</p>
        </div> */}

      </div>

    </div>
  )
}

export default Movie
