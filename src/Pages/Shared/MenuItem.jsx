

const MenuItem = ({item})=>{
    const {name, image, price,recipe} = item;
    return(
       <div className="flex space-x-4">
        <img style={{borderRadius: '0 200px 200px 200px'}} src={image} className="w-[120px]"></img>
        <div>
            <h3 className="uppercase">{name}--------</h3>
            <p>{recipe}</p>
        </div>
        <p>{price}</p>

       </div>
    );
};

export default MenuItem;