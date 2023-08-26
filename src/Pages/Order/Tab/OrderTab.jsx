import Card from '../../../Card/Card'

const Tab =({items})=>{
    return(
        <div className='grid md:grid-cols-3 gap-5'>
        {
            items.map(item => <Card key={item._id} item={item}></Card>)
        }
        </div>
    );
};

export default Tab;