import React, { createContext, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Upcoming from './pages/Upcoming_movie_inner.jsx'
import Home from './pages/Home.jsx'
import Ineerpage from './pages/Ineer.jsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import History from './pages/History.jsx'
export const theatrescontext = createContext();
export const moviecontext = createContext();


function App() {
  let [open, setOpen] = useState([])
  // let [Mov, setMovie] = useState([
  //   {
  //     name: "Shadow Lines",
  //     releasedate: "12 Jan 2024",
  //     released: true,
  //     poster: "https://image.tmdb.org/t/p/original/628Dep6AxEtDxjZoGP78TsOxYbK.jpg",
  //     video: "https://www.youtube.com/embed/5e2-BnQh4Gg?si=oZNL3kFV5_dNRZ3X" ,
  //     category: ["Drama", ""],
  //     genre: "UA/16+ ",
  //     langauage: "Hindi ,English",
  //     length: "2 hour 10 minutes",
  //     description: "A gripping thriller about a man uncovering hidden secrets.",
  //     rating: 4.1,
  //     reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "Echo Point",
  //     releasedate: "05 Mar 2024",
  //     released: true,
  //     poster: "https://tse1.explicit.bing.net/th/id/OIP.cFdwBofQS0HqdwUhbrr0DQHaK5",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Mystery", "Thriller"],
  //     genre: "UA/16+",
  //     langauage: "Hindi",
  //     length: "1 hour 55 minutes",
  //     description: "A detective unravels a strange case at a remote hill station.",
  //      reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "Fallen Sky",
  //     releasedate: "18 Aug 2024",
  //     released: true,
  //     poster: "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Action", "Drama"],
  //     genre: "UA/16+",
  //     langauage: "Hindi ,English",
  //     length: "2 hour 25 minutes",
  //     description: "A soldier fights against impossible odds to protect his nation.",
  //     rating: 4.5,
  //      reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "City of Dreams",
  //     releasedate: "02 Nov 2024",
  //     released: true,
  //     poster: "https://tse2.mm.bing.net/th/id/OIP.FAb7D69paN4lTjQ8PU38twHaLH",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Drama"],
  //     genre: "UA/13+",
  //     langauage: "Hindi",
  //     length: "2 hours",
  //     description: "A young boy struggles to survive and succeed in a big city.",
  //     rating: 4.0,
  //      reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "Night Runner",
  //     releasedate: "10 Feb 2025",
  //     released: true,
  //     poster: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Thriller"],
  //     genre: "UA/16+",
  //     langauage: "Hindi",
  //     length: "1 hour 48 minutes",
  //     description: "A courier becomes the target of a deadly conspiracy.",
  //     rating: 3.8,
  //     reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   // UPCOMING MOVIES
  //   {
  //     name: "The Last Signal",
  //     releasedate: "20 Dec 2025",
  //     released: false,
  //     poster: "https://image.tmdb.org/t/p/original/8YFL5QQVPy3AgrEQxNYVSgiPEbe.jpg",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Sci-Fi", "Thriller"],
  //     genre: "UA/16+",
  //     langauage: "Hindi ,English",
  //     length: "2 hour",
  //     description: "A scientist discovers a mysterious extraterrestrial message.",
  //     rating: 0,
  //     reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "Crimson River",
  //     releasedate: "17 Jan 2026",
  //     released: false,
  //     poster: "https://image.tmdb.org/t/p/original/jZIYaISP3GBSrVOPfrp98AMa8Ng.jpg",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Drama", "Thriller"],
  //     genre: "UA/16+",
  //     langauage: "Hindi",
  //     length: "1 hour 50 minutes",
  //     description: "A dark thriller about secrets hidden inside a small town.",
  //     rating: 0,
  //  reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "Moonlight Echoes",
  //     releasedate: "11 Apr 2026",
  //     released: false,
  //     poster: "https://image.tmdb.org/t/p/original/euYIwmwkmz95mnXvufEmbL6ovhZ.jpg",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Romance", "Drama"],
  //     genre: "UA/13+",
  //     langauage: "Hindi ,English",
  //     length: "2 hour 5 minutes",
  //     description: "A love story that transcends time and memory.",
  //     rating: 0,
  //   reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   },

  //   {
  //     name: "Zero Hour",
  //     releasedate: "28 Aug 2026",
  //     released: false,
  //     poster: "https://image.tmdb.org/t/p/original/bkpPTZUdq31UGDovmszsg2CchiI.jpg",
  //     video: "https://www.youtube.com/embed/2CXSw1oPj3I?si=WLbotaIbJD_CQWOy",
  //     category: ["Action", "Thriller"],
  //     genre: "UA/16+",
  //     langauage: "Hindi",
  //     length: "2 hour 20 minutes",
  //     description: "A special agent races against time to prevent a catastrophe.",
  //     rating: 0,
  //   reviews: [
  //       { platform: "Hungama News", review: "Amazing movie!", rating: 4.2 },
  //       { platform: "Times of India", review: "Great direction.", rating: 4.0 },
  //       { platform: "India Times", review: "Good storyline.", rating: 4.1 },
  //       { platform: "News 18", review: "Worth watching.", rating: 4.3 },
  //       { platform: "Filmfare", review: "Super acting!", rating: 4.0 },
  //             { platform: "Times of India", review: "Great direction.", rating: 4.0 },

  //     ],
  //     cast: [
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 1" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 2" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 3" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 4" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 5" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 6" },
  //       { image: "https://tse1.mm.bing.net/th/id/OIP.Zu87gW73klh42UG7Q_28yQHaEn?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3", name: "Actor 8" }
  //     ]
  //   }
  // ]);

  const [Mov, setMovie] = useState([]);
  const fetchMovies = async () => {

    const res = await fetch("http://localhost:4000/api/movie/getmovies");
    const data = await res.json();

    setMovie(data.data);



  };

  useEffect(() => {


    fetchMovies();
  }, []);


  let [theatres, setTheatres] = useState([

    //   {
    //     id: 1,
    //     name: "INOX Sapna Sangeeta",
    //     location: "Sapna Sangeeta Road, Indore",
    //     screens: 4,
    //     image:
    //       "https://tse2.mm.bing.net/th/id/OIP.0N-9FtrG2e5_bnd9ejGW6gHaET?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "10:00 AM" },
    //       { time: "1:30 PM" },
    //       { time: "4:45 PM" },
    //       { time: "8:00 PM" }
    //     ]
    //   },

    //   {
    //     id: 2,
    //     name: "PVR Treasure Island Mall",
    //     location: "TI Mall, MG Road, Indore",
    //     screens: 6,
    //     image:
    // "https://images.indianexpress.com/2021/07/cinema-halls-reopen.jpg?w=640",
    //     movies: [
    //       { time: "9:45 AM" },
    //       { time: "12:15 PM" },
    //       { time: "3:30 PM" },
    //       { time: "6:45 PM" },
    //       { time: "10:00 PM" }
    //     ]
    //   },

    //   {
    //     id: 3,
    //     name: "Cinema Tales 11",
    //     location: "Vijay Nagar, Indore",
    //     screens: 5,
    //     image:
    //       "https://filminformation.com/wp-content/uploads/2024/12/PHOTO-THEATRE.jpg",
    //     movies: [
    //       { time: "10:20 AM" },
    //       { time: "1:00 PM" },
    //       { time: "4:00 PM" },
    //       { time: "7:00 PM" }
    //     ]
    //   },

    //   {
    //     id: 4,
    //     name: "Velocity Cinema",
    //     location: "Scheme 54 PU4, Indore",
    //     screens: 5,
    //     image:
    //       "https://tse3.mm.bing.net/th/id/OIP.0RyGXsLOLUL5chb7EVdDhQAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "9:30 AM" },
    //       { time: "12:30 PM" },
    //       { time: "3:15 PM" },
    //       { time: "6:00 PM" },
    //       { time: "9:00 PM" }
    //     ]
    //   },

    //   {
    //     id: 5,
    //     name: "INOX Central Mall",
    //     location: "RNT Marg, Indore",
    //     screens: 4,
    //     image:
    //       "https://th.bing.com/th/id/OIP.-c11sOYmclSS9aAro6Fq6gHaDv?o=7&cb=ucfimg2&rm=3&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "10:15 AM" },
    //       { time: "1:00 PM" },
    //       { time: "4:10 PM" },
    //       { time: "7:20 PM" },
    //       { time: "10:10 PM" }
    //     ]
    //   },

    //   {
    //     id: 6,
    //     name: "Carnival Cinemas",
    //     location: "Malhar Mega Mall, Indore",
    //     screens: 6,
    //     image:
    //       "https://tse4.mm.bing.net/th/id/OIP.W6IpEQnewlGAUoZDQEZA0AHaEK?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "9:00 AM" },
    //       { time: "12:00 PM" },
    //       { time: "3:00 PM" },
    //       { time: "6:00 PM" },
    //       { time: "9:15 PM" }
    //     ]
    //   },

    //   {
    //     id: 7,
    //     name: "PVR Phoenix Citadel",
    //     location: "Phoenix Mall, Indore",
    //     screens: 7,
    //     image:
    //       "https://tse1.mm.bing.net/th/id/OIP.YHU-qAkbXMuYRqCryQWQBAHaE8?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "10:30 AM" },
    //       { time: "1:45 PM" },
    //       { time: "5:00 PM" },
    //       { time: "8:15 PM" }
    //     ]
    //   },

    //   {
    //     id: 8,
    //     name: "Raj Mandir Cinema",
    //     location: "Rajwada, Indore",
    //     screens: 3,
    //     image:
    //     "https://tse3.mm.bing.net/th/id/OIP.GM9Hi8_hQLt2tlsSlGJxhAHaFW?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "11:00 AM" },
    //       { time: "2:00 PM" },
    //       { time: "5:00 PM" },
    //       { time: "8:00 PM" }
    //     ]
    //   },

    //   {
    //     id: 9,
    //     name: "Sangeet Cinema",
    //     location: "Bhawarkuan, Indore",
    //     screens: 3,
    //     image:
    //       "https://tse3.mm.bing.net/th/id/OIP.TKeP1IVTFT8_j6HzPgw99QAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "9:45 AM" },
    //       { time: "12:45 PM" },
    //       { time: "4:00 PM" },
    //       { time: "7:30 PM" }
    //     ]
    //   },

    //   {
    //     id: 10,
    //     name: "PVR Aerodrum Road",
    //     location: "Aerodrum Road, Indore",
    //     screens: 4,
    //     image:
    //       "https://tse4.mm.bing.net/th/id/OIP.Qp0X3K03wlqNPGIspJS-sQAAAA?cb=ucfimg2&ucfimg=1&rs=1&pid=ImgDetMain&o=7&rm=3",
    //     movies: [
    //       { time: "10:00 AM" },
    //       { time: "1:00 PM" },
    //       { time: "4:15 PM" },
    //       { time: "7:30 PM" },
    //       { time: "10:45 PM" }
    //     ]
    //   }



  ]


  )
  const fetchTheatres = async () => {
    const res = await fetch("http://localhost:4000/api/theatres/gettheatres")
    const data = await res.json();
    setTheatres(data.data)
  };
  useEffect(() => {

    fetchTheatres();
  }, [])

  return (

    <div>

      <moviecontext.Provider value={{ Mov, setMovie }}>
        <theatrescontext.Provider value={{ theatres, setTheatres }}>
          <BrowserRouter>
            {/* {!location.pathname.includes("/history") && <Navbar/>} */}
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />}> </Route>
              <Route path='/history' element={<History />}></Route>
              <Route path='/UpComing' element={<Upcoming />}></Route>
              <Route path='/movies/:name' element={<Ineerpage />}></Route>
            </Routes>


          </BrowserRouter>
        </theatrescontext.Provider>
      </moviecontext.Provider>


      {!location.pathname.includes("history") && <Footer />}
    </div>
  )
}

export default App
