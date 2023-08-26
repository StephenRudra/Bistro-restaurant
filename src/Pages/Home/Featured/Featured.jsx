import SectionTitle from '../../../Components/SectionTitle/SectionTitle'
import featured from '../../../assets/home/featured.jpg'

const Featured = ()=>{
    return(
        <div className='featured text-white pt-8 bg-fixed'>
            <SectionTitle subHeading="Check it out" heading="Featured Items"></SectionTitle>
           <div className='md:flex justify-center items-center py-20 px-36'>
           <div>
                <img src={featured}></img>
            </div>
            <div className='md:ml-10'>
                <p>May 25, 2023</p>
                <p className='uppercase'>Where to get?</p>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta, quas iure excepturi at, aut labore illum laboriosam tempore optio fugiat totam, soluta dolorum consequatur consectetur. Commodi, eius. Recusandae quo provident animi, placeat obcaecati 
                    eveniet perspiciatis officiis, laudantium blanditiis mollitia iusto facere pariatur. Unde est veritatis libero eum dolore 
                    neque amet!</p>
                    <button className='btn btn-outline'>Order Now</button>
            </div>
           </div>

        </div>
    );
};

export default Featured;