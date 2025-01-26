import {useAppContext} from "../store/store";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; 
import Movie from "../components/Movie";

export default function Index(){
    const store = useAppContext();
    const navigate = useNavigate(); 

    const moviesContainer = {
        display: 'flex',
        flexWrap: 'wrap',        
        justifyContent: 'center',         
    }

    const movieItemStyle = {
        marginBottom: '40px', 
    };

    function handleDelete(id) {
        store.deleteItem(id); 
     }

    function handleEdit(id) {
        navigate(`/create?id=${id}`);
    }

    return(
        <Layout>
            <div style={moviesContainer}>
                {store.items.map((item) => (
                    <div key={item.id} style={movieItemStyle}>
                        <Movie item={item} handleEdit={handleEdit} handleDelete={handleDelete}/>                        
                    </div>
                ))}
            </div>
        </Layout>
    ) 
}

