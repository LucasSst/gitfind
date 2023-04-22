import './styles.css'

function ItemList({title, description, html_url}){
    return (
      <div className='item-list'>
        <h3> <a href={html_url} target='_blank' rel="noopener noreferrer">{title}</a></h3>
        <p>{description}</p>
        <hr />
      </div>  
    );
}

export default ItemList;
