import { createContext, useContext, useEffect, useState } from "react";
import ForrestGump from '../img/Forrest_Gump.jpg';
import Braveheart from '../img/braveheart.webp';
import BackToTheFuture from '../img/Back_to_the_Future.webp';
import KillBill from '../img/Kill_Bill_Volumen.jpg';
import TheWolfOfWallStreet from '../img/thewolfofwallstreet.jpg';
import Zohan from '../img/youdontmesswiththezohan.jpg';
import PridePrejudice from '../img/pride-and-prejudice.jpg';
import PulpFiction from '../img/Pulp_Fiction.jpg';
import Gladiator from '../img/Gladiator.jpg';

const AppContext = createContext({
    items: [],
    createItem: (item) => {},
    getItem: (id) => {},
    updateItem: (item) => {},
    deleteItem: (id) => {}
});

export default function Store({children}){

    const [items, setItems] = useState([
        {
            id: "1",
            title: "Forrest Gump",
            genre: "Drama, Romance",
            cover: ForrestGump, // Usando la importación
            director: "Robert Zemeckis",
            review: "Forrest Gump is an emotional film about a simple man from Alabama who inadvertently influences several historical events in the 20th century. Despite having a low IQ, Forrest leads an extraordinary life through hard work, love, and perseverance."
        },
        {
            id: "2",
            title: "Braveheart",
            genre: "Historical Drama, War",
            cover: Braveheart, // Usando la importación
            director: "Mel Gibson",
            review: "Braveheart is an epic war film that tells the story of William Wallace, a 13th-century Scottish warrior who leads his countrymen in a fight for freedom against English rule. The movie explores themes of courage, revenge, and patriotism."
        },
        {
            id: "3",
            title: "Back to the Future",
            genre: "Science Fiction, Comedy",
            cover: BackToTheFuture, // Usando la importación
            director: "Robert Zemeckis",
            review: "Back to the Future is a classic sci-fi film full of adventure, where Marty McFly, a teenager, travels back in time using a DeLorean car modified by the eccentric scientist Doc Brown. Marty must ensure his parents meet and fall in love or risk altering the future."
        },
        {
            id: "4",
            title: "Kill Bill",
            genre: "Action",
            cover: KillBill, // Usando la importación
            director: "Quentin Tarantino",
            review: "Kill Bill is an action-packed revenge film where The Bride, a former assassin, embarks on a mission to kill her former colleagues who betrayed her. Directed by Quentin Tarantino, the movie blends martial arts with a striking visual style and thrilling combat sequences."
        },
        {
            id: "5",
            title: "The Wolf of Wall Street",
            genre: "Comedy",
            cover: TheWolfOfWallStreet, // Usando la importación
            director: "Martin Scorsese",
            review: "The Wolf of Wall Street is a bold and overflowing film about ambition, corruption, and excess. Based on the true story of Jordan Belfort, the movie showcases his rise and fall in the world of stockbroking, where greed and unethical behavior are the driving forces."
        },
        {
            id: "6",
            title: "You Don't Mess with the Zohan",
            genre: "Comedy",
            cover: Zohan, // Usando la importación
            director: "Dennis Dugan",
            review: "You Don't Mess with the Zohan is an absurd comedy starring Adam Sandler as Zohan, an Israeli counter-terrorism operative who fakes his own death to pursue a new career as a hairstylist in New York. The movie is filled with zany humor and satirical moments."
        },
        {
            id: "7",
            title: "Pride and prejudice",
            genre: "Romance",
            cover: PridePrejudice,
            director: "Joe Wright",
            review: "A charming film adaptation of Jane Austen's classic novel, exploring love, pride, and society in an emotionally captivating way."
        },
        {
            id: "8",
            title: "Pulp Fiction",
            genre: "Crime",
            cover: PulpFiction,
            director: "Quentin Tarantino",
            review: "Pulp Fiction is a dark, witty crime drama that intertwines multiple stories with sharp dialogue and unforgettable characters, making it a cult classic."            
        },
        {
            id: "9",
            title: "Gladiator",
            genre: "Action",
            cover: Gladiator,
            director: "Ridley Scott",
            review: "Gladiator is a thrilling, powerful film with unforgettable performances, especially from Russell Crowe. A timeless story of revenge and honor."            
        }


    ]);

    function createItem(item){
        const temp = [...items];
        temp.push(item);

        setItems(temp);
    }

    function getItem(id){
        const item = items.find((item) => item.id === id);
        return item;
    }

    function updateItem(updatedItem) {
        const updatedItems = items.map(item =>
            item.id === updatedItem.id ? { ...updatedItem } : item
        );
        setItems(updatedItems);
    }

    // Función para eliminar un libro
    function deleteItem(id) {
        const filteredItems = items.filter((item) => item.id !== id); // Filtrar el libro por ID
        setItems(filteredItems); // Actualizar el estado con los libros restantes
    }

    // return <div>{children}</div>
    return (
        <AppContext.Provider
            value={{
                items,
                createItem,
                getItem,
                updateItem,
                deleteItem, // Exponer la función deleteItem
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
export function useAppContext(){
    return useContext(AppContext);
}