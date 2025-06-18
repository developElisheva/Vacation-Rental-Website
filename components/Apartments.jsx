// import Card from "./Card";
// export const Apartments = ({ apartments = [] }) => {
//     return (
//         <div className="apartments-container">
//             {apartments.length > 0 ? (
//                 apartments.map((apartment) => (
//                     <Card
//                         key={apartment._id}
//                         name={apartment.name}
//                         description={apartment.description}
//                         img={Array.isArray(apartment.img) ? apartment.img : []}
//                         category={apartment.category.name}
//                         apartmentDetails={apartment}
//                     />
//                 ))
//             ) : (
//                 <p>No apartments available</p>
//             )}
//         </div>
//     );
// };

import Card from "./Card.jsx"; // קומפוננטת כרטיס

export const Apartments = ({ apartments = [] }) => {
    return (
        <div className="apartments-container">
            {apartments.map((apartment) => (
                <Card
                    key={apartment._id}
                    name={apartment.name}
                    description={apartment.description}
                    img={Array.isArray(apartment.img) ? apartment.img : []} // וידוא שזה מערך
                    category={apartment.category.name}
                    apartmentDetails={apartment} // מעבירים את כל האובייקט לפרטים נוספים
                />
            ))}
        </div>
    );
};
