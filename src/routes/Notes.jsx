import { useContext } from "react";
import { UserContext } from "../components/UserContextProvider";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";


export default function Notes() {
const {user} = useContext(UserContext);
const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch(`https://localhost:5001/notes?userId=${userId}`);
      const data = await response.json();
      setNotes(data);
    };

    fetchNotes();
  }, [user.id]);

  const deleteNote = async (noteId) => {
    await fetch(`https://localhost:5001/notes/${noteId}`, {
      method: 'DELETE',
    });

    setNotes(notes.filter((note) => note.id !== noteId));
  };

    return (
        <div>
             <header>
            <p>Hello, {user.email}</p> 
            <Link to="/">About</Link>
            <Link to="/notes">Notes</Link>
            <Link to="/login">Log out</Link>
            </header>
            <div>
                <h1 className=" text-4xl">Notes</h1>
            </div>
            <div className=" bg-slate-400">
                <button className=" font-medium">Add new notes</button>
            </div>
            <h1>Notes</h1>
      <Link to="/create-note">Create new note</Link>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.title}</Link>
            <span>{note.date}</span>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
        </div>
    )
}