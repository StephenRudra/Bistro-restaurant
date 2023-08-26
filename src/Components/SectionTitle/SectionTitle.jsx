

const SectionTitle = ({heading, subHeading})=>{
    return(
        <div className="mx-auto text-center md:w-4/12 my-8">
        <p className="text-yellow-600 mb-4">---{subHeading}---</p>
        <h3 className="uppercase text-4xl border-y-4 py-4">{heading}</h3>
                </div>
    );
};

export default SectionTitle;

//"methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]