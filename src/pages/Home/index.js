import { useState } from 'react';

import {Header} from '../../components/Header'
import background from '../../assets/github.png'
import "./styles.css"
import ItemList from '../../components/ItemList';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repository, setRepository] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if(newUser.name ){
      const {avatar_url, name, bio , login, html_url} = newUser;
      setCurrentUser({avatar_url, name, bio, login, html_url});

      const resposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await resposData.json();

      if(newRepos.length){
        setRepository(newRepos)
      }
    }

  }
  return (
    <div className="App">
      <Header/>
      
      <main className='content__container'>

        <figure >
          <img src= {background} className='content__figure' alt='background gitfind'/>
        </figure>
        
        <section className='content__section'>
          <header className='content__section-header'>

            <input name='user' value={user} onChange={(event) => setUser(event.target.value)}  placeholder='@username'/>

            <button onClick={handleGetData}>Buscar</button>

          </header>
          {currentUser?.name ? (
            <>
              <div className='content__section__profile'>
                <figure className='section__profile-figure'>
                  <img className='profile__figure-img' src={currentUser.avatar_url} alt='perfil'/>
                </figure>
                <div className='info-profile__section' >
                  <h3>{currentUser.name}</h3>
                  <span>@{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
            </>
          ): null}
          

        
          {repository?.length ? (
            <>
              <div className='content__section-repository'>
                <h2>Repositório</h2> 
                {repository.map((repository) => (
                  <ItemList title={repository.name} html_url={repository.html_url} description={repository.description} />
                
                  )
                 )
                }
                
                <ItemList title="Title inovado" description="descrição" />
              </div>
            </>
          ): null}
          
          
        </section>

      </main>

    </div>
  );
}

export default App;
