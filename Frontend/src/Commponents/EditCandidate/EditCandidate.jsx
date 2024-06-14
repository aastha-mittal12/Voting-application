import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditCandidate.css';

const EditCandidate = () => {
    const params = useParams();
    const [candidate, setCandidate] = useState(null);
    let navigate= useNavigate()
    
    const partyRef = useRef();
    const sloganRef = useRef();
    const deedRef = useRef();
    const ageRef = useRef();
    const nameRef = useRef();
    const imgRef = useRef();
    const manifestoRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();

    useEffect(() => {
        const getCandidate = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/candidate/${params.id}`);
                setCandidate(res.data);
            } catch (error) {
                console.error('Error fetching candidate:', error);
            } 
        };

        getCandidate();

    }, [params.id]);

    useEffect(() => {
        if (candidate) {
            nameRef.current.value = candidate.name;
            partyRef.current.value = candidate.party;
            sloganRef.current.value = candidate.slogan;
            deedRef.current.value = candidate.gooddeed;
            ageRef.current.value = candidate.age;
            imgRef.current.value = candidate.imgUrl;
            manifestoRef.current.value = candidate.manifesto;
            passRef.current.value= candidate.password;
            emailRef.current.value= candidate.email;
            usernameRef.current.value= candidate.username;
        }
    }, [candidate]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedCandidate = {
                name: nameRef.current.value,
                party: partyRef.current.value,
                slogan: sloganRef.current.value,
                gooddeed: deedRef.current.value,
                age: ageRef.current.value,
                imgUrl: imgRef.current.value,
                manifesto: manifestoRef.current.value,
                password:passRef.current.value,
                username:usernameRef.current.value,
                email:emailRef.current.value

            };
           let response = await axios.put(`http://localhost:8080/candidate/${params.id}`, updatedCandidate);
           console.log(response)
            alert('Candidate details updated successfully!');
            navigate(`/candidate/${params.id}`)

        } catch (error) {
            console.error('Error updating candidate details:', error);
            alert('Failed to update candidate details');
        }
    };

    return (
        <div>
            <h1>Edit Candidate Details</h1>
            <form onSubmit={handleSubmit} className="edit-form">
                <label htmlFor="name">NAME</label>
                <input type="text" placeholder="Enter your name" ref={nameRef} required />

                <label htmlFor="Username">USERNAME</label>
                <input type="text" name="username" id="username" placeholder="Enter your username" ref={usernameRef} required disabled />

                <label htmlFor="Email">EMAIL</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" ref={emailRef} required  disabled/>
                
                <label htmlFor="password">PASSWORD</label>
                <input type="password" name="password" id="password" placeholder="Enter your password" ref={passRef} minLength={8} required />

                <label htmlFor="Party">Party</label>
                <input type="text" placeholder="Enter the name of party" ref={partyRef} required  disabled/>

                <label htmlFor="Slogan">Slogan</label>
                <input type="text" name="slogan" id="slogan" placeholder="Enter your slogan" ref={sloganRef} />

                <label htmlFor="img">Image URL</label>
                <input type="text" id="img" placeholder="Enter the URL of the image" ref={imgRef} />

                <label htmlFor="Age">Age</label>
                <input type="number" min={20} ref={ageRef} required />

                <label htmlFor="manifesto">MANIFESTO</label>
                <input type="text" placeholder="Enter the manifesto" name="manifesto" ref={manifestoRef} required />

                <label htmlFor="gooddeed">Good deeds</label>
                <textarea name="gooddeed" cols="30" rows="5" placeholder="Enter your good deeds" ref={deedRef} disabled></textarea>
  
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditCandidate;
