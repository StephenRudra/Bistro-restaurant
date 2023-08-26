import { Link } from 'react-router-dom';
import error from '../../assets/404.gif'

const Error = ()=>{
    return(
        <>
        <div className='flex justify-center' >
<img src={error}></img>

        </div>
        <div className='mt-5 flex justify-center'>
        <Link to='/'><button className="btn btn-outline btn-secondary">Back to home</button></Link>
        </div>
        </>
    );
};

export default Error;