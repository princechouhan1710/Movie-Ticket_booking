import React from 'react'
<<<<<<< HEAD
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
  
    <Outlet/>
    <Footer/>
      
=======
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


function Layout() {
  return (
    <>
        <Outlet/>
      <Footer/>
>>>>>>> a79176f88186b8693aa3c7a5661d8642a5de57ee
    </>
  )
}

<<<<<<< HEAD

//   {
//     name: "Border 2",
//     releasedate: new Date("2026-01-23"),
//     length: 165,
//     genre: "War",
//     langauage: ["Hindi"],
//     category: ["Action", "Drama"],
//     released: false,
//     castNames: ["Sunny Deol", "Ayushmann Khurrana"],
//     description: "A sequel to the iconic war drama Border, inspired by real-life military events.",
//     poster: yes,
//     video: yes,
//     theaters: ["PVR", "INOX", "Cinepolis"],
//     encodeName: "border-2"
//   },
//   {
//     name: "O' Romeo",
//     releasedate: new Date("2025-12-12"),
//     length: 130,
//     genre: "Romance",
//     langauage: ["Hindi"],
//     category: ["Drama", "Musical"],
//     released: false,
//     castNames: ["New Star Cast"],
//     description: "A modern romantic drama inspired by classic love stories.",
//     poster: yes,
//     video: yes,
//     theaters: ["PVR", "Cinepolis"],
//     encodeName: "o-romeo"
//   },
//   {
//     name: "Tu Yaa Main",
//     releasedate: new Date("2026-02-14"),
//     length: 140,
//     genre: "Romantic Thriller",
//     langauage: ["Hindi"],
//     category: ["Romance", "Thriller"],
//     released: false,
//     castNames: ["Adarsh Gourav", "Shanaya Kapoor"],
//     description: "A romantic thriller exploring obsession, love, and unexpected twists.",
//     poster: { filename: "tuyaamain.jpg", url: "/uploads/tuyaamain.jpg" },
//     video: no,
//     theaters: ["INOX", "PVR"],
//     encodeName: "tu-yaa-main"
//   },
//   {
//     name: "Mardaani 3",
//     releasedate: new Date("2026-03-06"),
//     length: 150,
//     genre: "Crime",
//     langauage: ["Hindi"],
//     category: ["Action", "Thriller"],
//     released: false,
//     castNames: ["Rani Mukerji"],
//     description: "Shivani Shivaji Roy returns to fight a new and dangerous criminal network.",
//     poster: { filename: "mardaani3.jpg", url: "/uploads/mardaani3.jpg" },
//     video: yes,
//     theaters: ["PVR", "Cinepolis", "INOX"],
//     encodeName: "mardaani-3"
//   },
//   {
//     name: "Crime 101",
//     releasedate: new Date("2025-12-05"),
//     length: 135,
//     genre: "Crime",
//     langauage: ["English"],
//     category: ["Thriller", "Drama"],
//     released: false,
//     castNames: ["Chris Hemsworth", "Pedro Pascal"],
//     description: "A high-stakes crime thriller based on a short story about jewel heists.",
//     poster: { filename: "crime101.jpg", url: "/uploads/crime101.jpg" },
//     video: yes,
//     theaters: ["IMAX", "Cinepolis"],
//     encodeName: "crime-101"
//   },
//   {
//     name: "Yeh Dil Aashiqana",
//     releasedate: new Date("2002-01-18"),
//     length: 150,
//     genre: "Romance",
//     langauage: ["Hindi"],
//     category: ["Drama", "Musical"],
//     released: true,
//     castNames: ["Karan Nath", "Jividha Sharma"],
//     description: "A romantic drama about love, sacrifice, and bravery.",
//     poster: { filename: "yehdilaashiqana.jpg", url: "/uploads/yehdilaashiqana.jpg" },
//     video: yes,
//     theaters: ["Re-Release Special Shows"],
//     encodeName: "yeh-dil-aashiqana"
//   }
// ];



// const movies2026 = [
//   {
//     name: "Avengers: Secret Wars",
//     releasedate: new Date("2026-03-15"),
//     length: 180,
//     genre: "Superhero/Action",
//     langauage: ["English"],
//     category: ["Action", "Adventure", "Sci-Fi"],
//     released: false,
//     castNames: ["Various Marvel Cast"],
//     description: "The multiverse saga reaches its epic conclusion.",
//     poster: { filename: "avengers-secret-wars.jpg", url: "/uploads/avengers-secret-wars.jpg" },
//     video:yes,
//     theaters: [],
//     encodeName: "avengers-secret-wars"
//   },
//   {
//     name: "The Batman Part II",
//     releasedate: new Date("2026-04-10"),
//     length: 170,
//     genre: "Action/Crime",
//     langauage: ["English"],
//     category: ["Action", "Crime", "Drama"],
//     released: false,
//     castNames: ["Robert Pattinson"],
//     description: "Batman faces a new dark threat in Gotham.",
//     poster: { filename: "batman2.jpg", url: "/uploads/batman2.jpg" },
//     video: yes,
//     theaters: [],
//     encodeName: "the-batman-part-2"
//   },
//   {
//     name: "Mission: Impossible 8",
//     releasedate: new Date("2026-05-22"),
//     length: 165,
//     genre: "Action/Spy",
//     langauage: ["English"],
//     category: ["Action", "Thriller"],
//     released: false,
//     castNames: ["Tom Cruise"],
//     description: "Ethan Hunt returns for another impossible mission.",
//     poster: { filename: "mi8.jpg", url: "/uploads/mi8.jpg" },
//     video:yes,
//     theaters: [],
//     encodeName: "mission-impossible-8"
//   },
//   {
//     name: "Deadpool 4",
//     releasedate: new Date("2026-05-30"),
//     length: 140,
//     genre: "Action/Comedy",
//     langauage: ["English"],
//     category: ["Action", "Comedy"],
//     released: false,
//     castNames: ["Ryan Reynolds"],
//     description: "Deadpool returns with more chaos and humor.",
//     poster: { filename: "deadpool4.jpg", url: "/uploads/deadpool4.jpg" },
//     video: yes},
//     theaters: [],
//     encodeName: "deadpool-4"
//   },
//   {
//     name: "Animal Park",
//     releasedate: new Date("2026-03-20"),
//     length: 165,
//     genre: "Action/Drama",
//     langauage: ["Hindi"],
//     category: ["Action", "Drama"],
//     released: false,
//     castNames: ["Ranbir Kapoor"],
//     description: "The intense sequel continuing the Animal saga.",
//     poster: { filename: "animalpark.jpg", url: "/uploads/animalpark.jpg" },
//     video: yes},
//     theaters: [],
//     encodeName: "animal-park"
//   },
//   {
//     name: "War 2",
//     releasedate: new Date("2026-04-05"),
//     length: 170,
//     genre: "Action/Spy",
//     langauage: ["Hindi"],
//     category: ["Action", "Thriller"],
//     released: false,
//     castNames: ["Hrithik Roshan", "Jr NTR"],
//     description: "A high-voltage spy action sequel.",
//     poster: { filename: "war2.jpg", url: "/uploads/war2.jpg" },
//     video: yes,
//     theaters: [],
//     encodeName: "war-2"
//   },
//   {
//     name: "Fighter 2",
//     releasedate: new Date("2026-04-25"),
//     length: 150,
//     genre: "Action/Airforce",
//     langauage: ["Hindi"],
//     category: ["Action", "Drama"],
//     released: false,
//     castNames: ["Hrithik Roshan"],
//     description: "Aerial combat action sequel.",
//     poster:no,
//     video: yes,
//     theaters: [],
//     encodeName: "fighter-2"
//   },
//   {
//     name: "Jawan 2",
//     releasedate: new Date("2026-05-15"),
//     length: 160,
//     genre: "Action/Thriller",
//     langauage: ["Hindi"],
//     category: ["Action", "Thriller"],
//     released: false,
//     castNames: ["Shah Rukh Khan"],
//     description: "The sequel to the blockbuster Jawan.",
//     poster: { filename: "jawan2.jpg", url: "/uploads/jawan2.jpg" },
//     video: yes,
//     theaters: [],
//     encodeName: "jawan-2"
//   }
// ];
=======
export default Layout
>>>>>>> a79176f88186b8693aa3c7a5661d8642a5de57ee
