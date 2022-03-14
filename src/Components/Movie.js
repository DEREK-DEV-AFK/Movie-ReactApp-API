import React, {useState} from 'react';
import './movie.css';
import Modal from 'react-modal/lib/components/Modal';
const Movie_img = "https://image.tmdb.org/t/p/original";
const Movie_details = "https://movie-task.vercel.app/api/movie?movieId=";



const setVoteClass = (vote) => {
     if(vote > 8){
          return "green";
     }
     else if(vote >= 6){
          return "orange";
     }
     else{
          return "red";
     }
}

const customStyles = {
     content : {
       top                   : '50%',
       left                  : '50%',
       right                 : 'auto',
       bottom                : 'auto',
       display               : 'flex',
       flexDirection         : 'Column',
       transform             : 'translate(-50%, -50%)'
     }

};

const imgStyle = {
     height: '100%',
    width: '200px',
    objectFit: 'cover'
}

Modal.setAppElement('#root')

const Movie = ({ title, poster_path, overview, vote_average, release_date, id, original_language}) => {

     const [modalIsOpen, setmodalIsOpen] = useState(false);
     const [MovieDetails, setMovieDetails] = useState([]);

     const getMovie = (API) => {
          fetch(API)
          .then((res) => res.json())
          .then((data) => {
              console.log(data.data);
              setMovieDetails(data.data);
          });
     }

    return (
         <div className='movie' >
              <img onClick={() => {setmodalIsOpen(true); console.log("Set to true!"); getMovie(Movie_details + id )  }} src={(poster_path ? Movie_img + poster_path : 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')} alt={title}></img>
              <div className='movie-info'>
                   <h3>{title}</h3>
                   <span className={`tag ${setVoteClass(vote_average)}`} >{vote_average}</span>

              </div>
              <Modal isOpen={modalIsOpen} onRequestClose={() => setmodalIsOpen(false)} style={customStyles}>
                    <div className='wrapper-main'>
                        <div className='wrapper-img'>
                        <img style={imgStyle} src={(poster_path ? Movie_img + MovieDetails.poster_path : 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG1vdmllfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60')}  alt={MovieDetails.original_title} ></img>
                        </div>
                        <div className='wrapper-submain'>
                              <div className='wrapper-header'>
                                   <h2>{MovieDetails.original_title}</h2>
                                   <h3>{MovieDetails.original_language}</h3>
                                   <h4>{MovieDetails.release_date}</h4>
                              </div>
                              <p>{MovieDetails.overview}</p>
                              <button onClick={() => {setmodalIsOpen(false); console.log("Set to false!")}} >Close</button>
                        </div>
                    </div>
              </Modal>
              <div className='movie-overview'>
                   <h3>Overview</h3>
                   <p>{overview}</p>
              </div>
         </div>
    )
};

export default Movie;
